from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
import uuid

from app.schemas import TaskCreate, TaskUpdate, TaskResponse
from app import storage
from app.priority import calculate_task_score, get_task_urgency

app = FastAPI(
    title="StudyFlow API",
    description="Backend API for StudyFlow Student Productivity App",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def enrich_task(task):
    """Add calculated smart priority information to a task."""

    score = calculate_task_score(task)

    return {
        **task,
        "priority_score": score,
        "urgency": get_task_urgency(score)
    }


def calculate_next_task(tasks):
    """Return the highest-priority incomplete task."""

    incomplete_tasks = [
        task
        for task in tasks
        if not task.get("completed", False)
    ]

    if not incomplete_tasks:
        return None

    enriched_tasks = [
        enrich_task(task)
        for task in incomplete_tasks
    ]

    return max(
        enriched_tasks,
        key=lambda task: task["priority_score"]
    )


@app.get("/")
def root():
    return {
        "message": "Welcome to StudyFlow API! Visit /docs for endpoints."
    }


@app.get("/tasks", response_model=List[TaskResponse])
def get_tasks(
    completed: Optional[bool] = None,
    category: Optional[str] = None,
    priority: Optional[str] = None,
    sort_by: Optional[str] = None
):
    tasks = storage.load_tasks()

    if completed is not None:
        tasks = [
            task
            for task in tasks
            if task.get("completed", False) == completed
        ]

    if category:
        tasks = [
            task
            for task in tasks
            if task.get("category", "General").lower()
            == category.lower()
        ]

    if priority:
        tasks = [
            task
            for task in tasks
            if task.get("priority", "medium").lower()
            == priority.lower()
        ]

    enriched_tasks = [
        enrich_task(task)
        for task in tasks
    ]

    if sort_by == "priority":
        enriched_tasks.sort(
            key=lambda task: task["priority_score"],
            reverse=True
        )

    elif sort_by == "deadline":
        enriched_tasks.sort(
            key=lambda task: (
                task.get("dueDate", "") == "",
                task.get("dueDate", "")
            )
        )

    elif sort_by == "study_time":
        enriched_tasks.sort(
            key=lambda task: task.get(
                "estimated_minutes",
                30
            )
        )

    return enriched_tasks


@app.get(
    "/tasks/next",
    response_model=Optional[TaskResponse]
)
def get_next_task():
    """Return the highest-priority incomplete task."""

    tasks = storage.load_tasks()

    return calculate_next_task(tasks)


@app.post(
    "/tasks",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED
)
def create_task(task_data: TaskCreate):
    tasks = storage.load_tasks()
    now = datetime.utcnow().isoformat()

    new_task = {
        "id": str(uuid.uuid4()),
        "title": task_data.title.strip(),
        "description": (
            task_data.description.strip()
            if task_data.description
            else ""
        ),
        "category": (
            task_data.category.strip()
            if task_data.category
            else "General"
        ),
        "priority": (
            task_data.priority.lower()
            if task_data.priority
            else "medium"
        ),
        "dueDate": (
            task_data.dueDate
            if task_data.dueDate
            else ""
        ),
        "estimated_minutes": task_data.estimated_minutes,
        "completed": False,
        "created_at": now,
        "updated_at": now
    }

    tasks.append(new_task)
    storage.save_tasks(tasks)

    return enrich_task(new_task)


@app.get(
    "/tasks/{task_id}",
    response_model=TaskResponse
)
def get_task(task_id: str):
    tasks = storage.load_tasks()

    task = next(
        (
            task
            for task in tasks
            if task["id"] == task_id
        ),
        None
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return enrich_task(task)


@app.put(
    "/tasks/{task_id}",
    response_model=TaskResponse
)
def update_task(
    task_id: str,
    task_update: TaskUpdate
):
    tasks = storage.load_tasks()

    task = next(
        (
            task
            for task in tasks
            if task["id"] == task_id
        ),
        None
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    update_data = task_update.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        if value is not None:
            task[key] = value

    task["updated_at"] = datetime.utcnow().isoformat()

    storage.save_tasks(tasks)

    return enrich_task(task)


@app.delete(
    "/tasks/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_task(task_id: str):
    tasks = storage.load_tasks()

    initial_len = len(tasks)

    tasks = [
        task
        for task in tasks
        if task["id"] != task_id
    ]

    if len(tasks) == initial_len:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    storage.save_tasks(tasks)

    return None


@app.patch(
    "/tasks/{task_id}/complete",
    response_model=TaskResponse
)
def toggle_task_completion(task_id: str):
    tasks = storage.load_tasks()

    task = next(
        (
            task
            for task in tasks
            if task["id"] == task_id
        ),
        None
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task["completed"] = not task["completed"]
    task["updated_at"] = datetime.utcnow().isoformat()

    storage.save_tasks(tasks)

    return enrich_task(task)
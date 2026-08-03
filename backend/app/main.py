from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
import uuid

from app.schemas import TaskCreate, TaskUpdate, TaskResponse
from app import storage

app = FastAPI(
    title="StudyFlow API",
    description="Backend API for StudyFlow Student Productivity App",
    version="1.0.0"
)

# 🌐 ENABLE CORS (React Frontend se connection ke liye zaroori hai)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to StudyFlow API! Visit /docs for endpoints."}


# --- GET ALL TASKS ---
@app.get("/tasks", response_model=List[TaskResponse])
def get_tasks():
    return storage.load_tasks()


# --- CREATE TASK ---
@app.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task_data: TaskCreate):
    tasks = storage.load_tasks()
    now = datetime.utcnow().isoformat()

    new_task = {
        "id": str(uuid.uuid4()),
        "title": task_data.title.strip(),
        "description": task_data.description.strip() if task_data.description else "",
        "category": task_data.category.strip() if task_data.category else "General",
        "priority": task_data.priority.lower() if task_data.priority else "medium",
        "dueDate": task_data.dueDate if task_data.dueDate else "",
        "completed": False,
        "created_at": now,
        "updated_at": now
    }

    tasks.append(new_task)
    storage.save_tasks(tasks)
    return new_task


# --- GET SINGLE TASK ---
@app.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task(task_id: str):
    tasks = storage.load_tasks()
    task = next((t for t in tasks if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


# --- UPDATE TASK ---
@app.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: str, task_update: TaskUpdate):
    tasks = storage.load_tasks()
    task = next((t for t in tasks if t["id"] == task_id), None)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            task[key] = value

    task["updated_at"] = datetime.utcnow().isoformat()
    storage.save_tasks(tasks)
    return task


# --- DELETE TASK ---
@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: str):
    tasks = storage.load_tasks()
    initial_len = len(tasks)
    tasks = [t for t in tasks if t["id"] != task_id]

    if len(tasks) == initial_len:
        raise HTTPException(status_code=404, detail="Task not found")

    storage.save_tasks(tasks)
    return None
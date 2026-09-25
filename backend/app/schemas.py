from pydantic import BaseModel, Field
from typing import Optional


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = ""
    category: Optional[str] = "General"
    priority: Optional[str] = "medium"
    dueDate: Optional[str] = ""
    estimated_minutes: Optional[int] = Field(default=30, ge=1)


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    dueDate: Optional[str] = None
    estimated_minutes: Optional[int] = Field(
        default=None,
        ge=1
    )
    completed: Optional[bool] = None


class TaskResponse(TaskBase):
    id: str
    completed: bool
    created_at: str
    updated_at: str
    priority_score: int
    urgency: str
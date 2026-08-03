from pydantic import BaseModel
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = ""
    category: Optional[str] = "General"
    priority: Optional[str] = "medium"
    dueDate: Optional[str] = ""

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    dueDate: Optional[str] = None
    completed: Optional[bool] = None

class TaskResponse(TaskBase):
    id: str
    completed: bool
    created_at: str
    updated_at: str
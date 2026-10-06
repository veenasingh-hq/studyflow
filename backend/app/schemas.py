from pydantic import BaseModel, Field, field_validator
from typing import Optional


ALLOWED_PRIORITIES = {"low", "medium", "high"}


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = ""
    category: Optional[str] = "General"
    priority: Optional[str] = "medium"
    dueDate: Optional[str] = ""
    estimated_minutes: Optional[int] = Field(default=30, ge=1)

    @field_validator("title")
    @classmethod
    def validate_title(cls, value):
        value = value.strip()

        if not value:
            raise ValueError("Task title cannot be empty.")

        if len(value) > 200:
            raise ValueError(
                "Task title cannot exceed 200 characters."
            )

        return value

    @field_validator("priority")
    @classmethod
    def validate_priority(cls, value):
        if value is None:
            return "medium"

        value = value.strip().lower()

        if value not in ALLOWED_PRIORITIES:
            raise ValueError(
                "Priority must be low, medium, or high."
            )

        return value

    @field_validator("category")
    @classmethod
    def validate_category(cls, value):
        if value is None:
            return "General"

        value = value.strip()

        if not value:
            return "General"

        return value

    @field_validator("description")
    @classmethod
    def validate_description(cls, value):
        if value is None:
            return ""

        return value.strip()


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

    @field_validator("title")
    @classmethod
    def validate_title(cls, value):
        if value is None:
            return value

        value = value.strip()

        if not value:
            raise ValueError("Task title cannot be empty.")

        if len(value) > 200:
            raise ValueError(
                "Task title cannot exceed 200 characters."
            )

        return value

    @field_validator("priority")
    @classmethod
    def validate_priority(cls, value):
        if value is None:
            return value

        value = value.strip().lower()

        if value not in ALLOWED_PRIORITIES:
            raise ValueError(
                "Priority must be low, medium, or high."
            )

        return value

    @field_validator("category")
    @classmethod
    def validate_category(cls, value):
        if value is None:
            return value

        value = value.strip()

        if not value:
            return "General"

        return value

    @field_validator("description")
    @classmethod
    def validate_description(cls, value):
        if value is None:
            return value

        return value.strip()


class TaskResponse(TaskBase):
    id: str
    completed: bool
    created_at: str
    updated_at: str
    priority_score: int
    urgency: str
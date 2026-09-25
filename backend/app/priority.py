"""Business logic for ranking StudyFlow tasks."""

from __future__ import annotations

from datetime import date
from typing import Any, Iterable


class Priority:
   """Calculate task priority and select the next task to study.

   
   Tasks can be dictionaries or objects. Supported fields are ``due_date``
   (an ISO date or :class:`date`), ``importance``, ``difficulty``, and
   ``completed``.
   """

   @staticmethod
   def _value(task: Any, name: str, default: Any = None) -> Any:
      if isinstance(task, dict):
         return task.get(name, default)
      return getattr(task, name, default)

   @classmethod
   def priority(cls, task: Any, *, today: date | None = None) -> float:
      """Return a higher score for tasks that deserve earlier attention."""
      if cls._value(task, "completed", False):
         return float("-inf")

      today = today or date.today()
      due = cls._value(task, "due_date")
      if isinstance(due, str):
         try:
            due = date.fromisoformat(due)
         except ValueError:
            due = None
      days_left = (due - today).days if isinstance(due, date) else 30
      urgency = 100.0 if days_left <= 0 else max(0.0, 30.0 - days_left)

      def score(name: str) -> float:
         try:
            return max(0.0, min(10.0, float(cls._value(task, name, 0))))
         except (TypeError, ValueError):
            return 0.0

      return urgency * 2.0 + score("importance") * 5.0 + score("difficulty") * 2.0

   @classmethod
   def rank(cls, tasks: Iterable[Any], *, today: date | None = None) -> list[Any]:
      """Return tasks sorted from highest to lowest priority."""
      return sorted(tasks, key=lambda task: cls.priority(task, today=today), reverse=True)

   @classmethod
   def next_task(cls, tasks: Iterable[Any], *, today: date | None = None) -> Any | None:
      """Return the highest-priority incomplete task, if one exists."""
      for task in cls.rank(tasks, today=today):
         if not cls._value(task, "completed", False):
            return task
      return None
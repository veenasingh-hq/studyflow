"""Business logic for calculating StudyFlow task priority."""

from datetime import datetime


PRIORITY_SCORES = {
    "high": 30,
    "medium": 20,
    "low": 10,
}


def calculate_task_score(task):
    """
    Calculate a smart priority score for a StudyFlow task.

    Higher score means the task needs more attention.
    """

    score = 0

    # Priority
    priority = task.get("priority", "medium").lower()
    score += PRIORITY_SCORES.get(priority, 20)

    # Deadline urgency
    due_date = task.get("dueDate")

    if due_date:
        try:
            due = datetime.strptime(due_date, "%Y-%m-%d").date()
            today = datetime.now().date()
            days_remaining = (due - today).days

            if days_remaining < 0:
                score += 50
            elif days_remaining == 0:
                score += 45
            elif days_remaining == 1:
                score += 40
            elif days_remaining <= 3:
                score += 30
            elif days_remaining <= 7:
                score += 20
            else:
                score += 5

        except ValueError:
            pass

    # Estimated study time
    estimated_minutes = task.get("estimated_minutes", 30)

    if estimated_minutes >= 120:
        score += 15
    elif estimated_minutes >= 60:
        score += 10
    elif estimated_minutes >= 30:
        score += 5

    # Completed tasks should not receive priority
    if task.get("completed", False):
        score = 0

    return score


def get_task_urgency(score):
    """
    Convert a numerical priority score into an urgency level.
    """

    if score >= 80:
        return "critical"

    if score >= 60:
        return "high"

    if score >= 40:
        return "medium"

    return "low"
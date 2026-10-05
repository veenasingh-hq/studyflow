def calculate_task_stats(tasks):
    """Calculate study statistics from a list of tasks."""

    total_tasks = len(tasks)

    completed_tasks = sum(
        1
        for task in tasks
        if task.get("completed", False)
    )

    pending_tasks = total_tasks - completed_tasks

    total_study_minutes = sum(
        task.get("estimated_minutes", 30) or 30
        for task in tasks
    )

    pending_study_minutes = sum(
        task.get("estimated_minutes", 30) or 30
        for task in tasks
        if not task.get("completed", False)
    )

    critical_tasks = sum(
        1
        for task in tasks
        if task.get("urgency") == "critical"
        and not task.get("completed", False)
    )

    high_urgency_tasks = sum(
        1
        for task in tasks
        if task.get("urgency") == "high"
        and not task.get("completed", False)
    )

    completion_percentage = (
        round((completed_tasks / total_tasks) * 100, 1)
        if total_tasks > 0
        else 0
    )

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "total_study_minutes": total_study_minutes,
        "pending_study_minutes": pending_study_minutes,
        "critical_tasks": critical_tasks,
        "high_urgency_tasks": high_urgency_tasks,
        "completion_percentage": completion_percentage,
    }


    
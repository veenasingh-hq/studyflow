const API_URL = "http://127.0.0.1:8000";

export async function fetchTasks(sortBy = "") {
  const url = sortBy
    ? `${API_URL}/tasks?sort_by=${encodeURIComponent(sortBy)}`
    : `${API_URL}/tasks`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return await response.json();
}

export async function fetchNextTask() {
  const response = await fetch(`${API_URL}/tasks/next`);

  if (!response.ok) {
    throw new Error("Failed to fetch next task");
  }

  return await response.json();
}

export async function fetchTaskStats() {
  const response = await fetch(`${API_URL}/tasks/stats`);

  if (!response.ok) {
    throw new Error("Failed to fetch task statistics");
  }

  return await response.json();
}

export async function createTask(taskData) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return await response.json();
}

export async function updateTask(taskId, updateData) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return await response.json();
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return true;
}
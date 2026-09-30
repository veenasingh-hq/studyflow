const API_BASE_URL = 'http://127.0.0.1:8000';

export async function fetchTasks(sortBy = 'priority') {
  const params = new URLSearchParams();

  if (sortBy) {
    params.append('sort_by', sortBy);
  }

  const response = await fetch(
    `${API_BASE_URL}/tasks?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
}


export async function createTask(taskData) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
}


export async function updateTask(taskId, taskData) {
  const response = await fetch(
    `${API_BASE_URL}/tasks/${taskId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  return response.json();
}


export async function deleteTask(taskId) {
  const response = await fetch(
    `${API_BASE_URL}/tasks/${taskId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}
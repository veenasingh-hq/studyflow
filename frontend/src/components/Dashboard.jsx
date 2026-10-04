import React, { useState, useEffect, useMemo } from 'react';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import FilterBar from './FilterBar';
import {
  fetchTasks,
  fetchNextTask,
  createTask,
  updateTask,
  deleteTask,
} from '../api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [nextTask, setNextTask] = useState(null);

  const [loading, setLoading] = useState(true);
  const [nextTaskLoading, setNextTaskLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  const loadTasksData = async (selectedSort = sortBy) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchTasks(selectedSort);
      setTasks(data);
    } catch (err) {
      setError(
        'Unable to load tasks. Please check if the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadNextTask = async () => {
    try {
      setNextTaskLoading(true);

      const data = await fetchNextTask();
      setNextTask(data);
    } catch (err) {
      setNextTask(null);
    } finally {
      setNextTaskLoading(false);
    }
  };

  useEffect(() => {
    loadTasksData();
  }, [sortBy]);

  useEffect(() => {
    loadNextTask();
  }, [tasks]);

  const handleAddTask = async (taskData) => {
    try {
      setError(null);

      const newTask = await createTask(taskData);

      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ]);
    } catch (err) {
      setError('Unable to create task.');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      setError(null);

      const updatedTask = await updateTask(task.id, {
        completed: !task.completed,
      });

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === task.id
            ? updatedTask
            : item
        )
      );
    } catch (err) {
      setError('Unable to update task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setError(null);

      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== taskId
        )
      );
    } catch (err) {
      setError('Unable to delete task.');
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const title =
        task.title?.toLowerCase() || '';

      const description =
        task.description?.toLowerCase() || '';

      const matchesSearch =
        title.includes(search.toLowerCase()) ||
        description.includes(search.toLowerCase());

      const matchesCategory =
        !category ||
        task.category === category;

      const matchesPriority =
        !priority ||
        task.priority === priority;

      const matchesStatus =
        !status ||
        (status === 'completed' &&
          task.completed) ||
        (status === 'pending' &&
          !task.completed);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [
    tasks,
    search,
    category,
    priority,
    status,
  ]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    totalTasks - completedTasks;

  const completionRate =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  const categories = [
    ...new Set(
      tasks
        .map((task) => task.category)
        .filter(Boolean)
    ),
  ];

  const handleNextTaskComplete = async () => {
    if (!nextTask) return;

    await handleToggleComplete(nextTask);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Study Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Organize your study tasks and stay focused.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <div className="flex items-center justify-between gap-4">
            <span>{error}</span>

            <button
              onClick={() => {
                loadTasksData();
                loadNextTask();
              }}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Smart Next Task */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg">
        {nextTaskLoading ? (
          <div>
            <p className="text-sm font-medium text-indigo-100">
              Smart Recommendation
            </p>

            <p className="mt-2 text-lg">
              Finding your next task...
            </p>
          </div>
        ) : nextTask ? (
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-sm font-medium text-indigo-100">
                🔥 Next Task to Study
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {nextTask.title}
              </h2>

              {nextTask.description && (
                <p className="mt-2 max-w-2xl text-sm text-indigo-100">
                  {nextTask.description}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                  Priority: {nextTask.priority}
                </span>

                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                  Score: {nextTask.priority_score}
                </span>

                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                  Urgency: {nextTask.urgency}
                </span>

                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                  ⏱️ {nextTask.estimated_minutes || 30} min
                </span>
              </div>
            </div>

            <button
              onClick={handleNextTaskComplete}
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
            >
              Mark Complete
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium text-indigo-100">
              🎉 All Caught Up!
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              No pending tasks
            </h2>

            <p className="mt-2 text-sm text-indigo-100">
              Add a new study task to get started.
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">
            Total Tasks
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalTasks}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">
            Completed
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {completedTasks}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-600">
            {pendingTasks}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">
            Completion Rate
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {completionRate}%
          </p>
        </div>

      </div>

      {/* Add Task */}
      <TaskForm onSubmit={handleAddTask} />

      {/* Filters + Sorting */}
      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">

        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              Find Tasks
            </h2>

            <p className="text-sm text-gray-500">
              Search and filter your study tasks.
            </p>
          </div>

          {/* Sort By */}
          <div className="w-full lg:w-56">
            <label
              htmlFor="sortBy"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Sort By
            </label>

            <select
              id="sortBy"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                Default Order
              </option>

              <option value="priority">
                Smart Priority
              </option>

              <option value="deadline">
                Nearest Deadline
              </option>

              <option value="study_time">
                Shortest Study Time
              </option>
            </select>
          </div>

        </div>

        <FilterBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          priority={priority}
          setPriority={setPriority}
          status={status}
          setStatus={setStatus}
          categories={categories}
        />
      </div>

      {/* Task List */}
      <div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Tasks
          </h2>

          <span className="text-sm text-gray-500">
            {filteredTasks.length} task
            {filteredTasks.length !== 1
              ? 's'
              : ''}
          </span>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">
            <p className="text-gray-500">
              Loading tasks...
            </p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">
            <p className="text-gray-500">
              No tasks found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={
                  handleToggleComplete
                }
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
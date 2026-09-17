import React, { useState, useEffect, useMemo } from 'react';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import FilterBar from './FilterBar';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Load tasks from backend
  const loadTasksData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError('Unable to connect to the StudyFlow server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasksData();
  }, []);

  // Add Task
  const handleAddTask = async (newTaskData) => {
    try {
      setError(null);

      const created = await createTask(newTaskData);
      setTasks((prev) => [created, ...prev]);
    } catch (err) {
      console.error('Failed to create task:', err);
      setError('Unable to create the task. Please try again.');
    }
  };

  // Toggle Completion
  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      setError(null);

      const updated = await updateTask(taskId, {
        completed: !currentStatus,
      });

      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updated : task))
      );
    } catch (err) {
      console.error('Failed to update task:', err);
      setError('Unable to update the task. Please try again.');
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setError(null);

      await deleteTask(taskId);

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Unable to delete the task. Please try again.');
    }
  };

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const cats = tasks
      .map((task) => task.category?.trim().toLowerCase())
      .filter(Boolean);

    return Array.from(new Set(cats));
  }, [tasks]);

  // Client-side filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || '';
      const description = task.description?.toLowerCase() || '';
      const priority = task.priority?.toLowerCase() || '';
      const category = task.category?.toLowerCase() || '';

      const matchesSearch =
        title.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase());

      const matchesPriority =
        selectedPriority === 'all' ||
        priority === selectedPriority.toLowerCase();

      const matchesCategory =
        selectedCategory === 'all' ||
        category === selectedCategory.toLowerCase();

      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'completed' ? task.completed : !task.completed);

      return (
        matchesSearch &&
        matchesPriority &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    tasks,
    searchQuery,
    selectedPriority,
    selectedCategory,
    selectedStatus,
  ]);

  // Statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome Back, Student! 👋
        </h1>

        <p className="text-gray-500 mt-1">
          Here is a quick overview of your daily study goals and tasks.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {totalTasks}
            </p>
          </div>

          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl font-bold">
            📋
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">
              {pendingTasks}
            </p>
          </div>

          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-xl font-bold">
            ⏳
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">
              {completedTasks}
            </p>
          </div>

          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xl font-bold">
            ✅
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Form */}
        <div className="lg:col-span-1">
          <TaskForm onTaskAdded={handleAddTask} />
        </div>

        {/* Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            categories={categories}
          />

          <div className="flex items-center justify-between pt-2">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>📋</span>
              Your Tasks ({filteredTasks.length})
            </h2>

            {(searchQuery ||
              selectedCategory !== 'all' ||
              selectedPriority !== 'all' ||
              selectedStatus !== 'all') && (
              <span className="text-xs text-indigo-600 font-medium">
                Showing filtered results
              </span>
            )}
          </div>

          {/* Error State */}
          {error && !loading && (
            <div className="bg-white p-6 rounded-xl text-center border-2 border-dashed border-red-200">
              <p className="text-lg font-medium text-red-600">
                ⚠️ Something went wrong
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {error}
              </p>

              <button
                onClick={loadTasksData}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="bg-white p-8 rounded-xl text-center text-gray-400 border-2 border-dashed border-gray-200">
              <p className="text-lg font-medium text-gray-600">
                Loading tasks... ⏳
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Loading tasks from server...
              </p>
            </div>
          ) : error ? null : filteredTasks.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center text-gray-400 border-2 border-dashed border-gray-200">
              <p className="text-lg font-medium text-gray-600">
                No matching tasks found!
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Try resetting your filters or search term.
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Add your first task using the form on the left.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDeleteTask={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
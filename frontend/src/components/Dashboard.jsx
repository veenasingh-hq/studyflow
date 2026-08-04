import React, { useState, useEffect, useMemo } from 'react';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import FilterBar from './FilterBar';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Load tasks on mount
  const loadTasksData = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasksData();
  }, []);

  // Handlers
  const handleAddTask = async (newTaskData) => {
    const created = await createTask(newTaskData);
    setTasks((prev) => [created, ...prev]);
  };

  // 3. Toggle Completion Handler
  // 3. Toggle Completion Handler
  const handleToggleComplete = async (taskId, currentStatus) => {
    const updated = await updateTask(taskId, { completed: !currentStatus });
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? updated : t))
    );
  };

  // 4. Delete Task Handler
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };
  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const cats = tasks
      .map((t) => t.category?.trim().toLowerCase())
      .filter(Boolean);
    return Array.from(new Set(cats));
  }, [tasks]);

  // Client-side Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Search Query
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Priority Filter
      const matchesPriority =
        selectedPriority === 'all' ||
        task.priority.toLowerCase() === selectedPriority.toLowerCase();

      // 3. Category Filter
      const matchesCategory =
        selectedCategory === 'all' ||
        task.category.toLowerCase() === selectedCategory.toLowerCase();

      // 4. Status Filter
      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'completed' ? task.completed : !task.completed);

      return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
    });
  }, [tasks, searchQuery, selectedPriority, selectedCategory, selectedStatus]);

  // Overall Statistics
  // Dynamic Statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Student! 👋</h1>
        <p className="text-gray-500 mt-1">Here is a quick overview of your daily study goals and tasks.</p>
      </div>
      {/* Stats Overview */}
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{totalTasks}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl font-bold">📋</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">{pendingTasks}</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-xl font-bold">⏳</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">{completedTasks}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xl font-bold">✅</div>
        </div>
      </div>
      {/* Main Content Layout */}
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form */}
        <div className="lg:col-span-1">
          <TaskForm onTaskAdded={handleAddTask} />
        </div>

        {/* Right Column: Filter Bar & Task Cards */}
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
              <span>📋</span> Your Tasks ({filteredTasks.length})
            </h2>
            {(searchQuery || selectedCategory !== 'all' || selectedPriority !== 'all' || selectedStatus !== 'all') && (
              <span className="text-xs text-indigo-600 font-medium">
                Showing filtered results
              </span>
            )}
          </div>

          {loading ? (
            <div className="bg-white p-8 rounded-xl text-center text-gray-400 border-2 border-dashed border-gray-200">
              <p className="text-lg font-medium text-gray-600">Loading tasks... ⏳</p>
              <p className="text-sm text-gray-400 mt-1">Loading tasks from server... ⏳</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center text-gray-400 border-2 border-dashed border-gray-200">
              <p className="text-lg font-medium text-gray-600">No matching tasks found!</p>
              <p className="text-sm text-gray-400 mt-1">Try resetting your filters or search term.</p>
              <p className="text-sm text-gray-400 mt-1">Add your first task using the form on the left.</p>
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
import React, { useState } from 'react';

export default function TaskForm({ onTaskAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: '',
    estimated_minutes: 30
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return alert("Please enter a task title!");
    }

    setLoading(true);

    try {
      await onTaskAdded({
        ...formData,
        estimated_minutes: Number(formData.estimated_minutes)
      });

      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        dueDate: '',
        estimated_minutes: 30
      });
    } catch (err) {
      alert(
        "Failed to create task. Make sure FastAPI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>➕</span> Add New Task
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
            Task Title *
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Complete Chapter 3 Physics"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
            Description
          </label>

          <textarea
            rows="2"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Key notes or subtasks..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
            Subject / Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Mathematics, Coding, History"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Priority & Due Date */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="low">Low 🟢</option>
              <option value="medium">Medium 🟡</option>
              <option value="high">High 🔴</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            />
          </div>
        </div>

        {/* Estimated Study Time */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
            Estimated Study Time
          </label>

          <div className="relative">
            <input
              type="number"
              name="estimated_minutes"
              value={formData.estimated_minutes}
              onChange={handleChange}
              min="1"
              placeholder="e.g., 60"
              className="w-full px-3 py-2 pr-20 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              minutes
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-1">
            How long do you expect this task to take?
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {loading ? "Adding..." : "➕ Add Task"}
        </button>
      </form>
    </div>
  );
}
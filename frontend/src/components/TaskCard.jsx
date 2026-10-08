import React, { useState } from 'react';

export default function TaskCard({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask
}) {
  const {
    id,
    title,
    description,
    category,
    priority,
    completed,
    dueDate,
    estimated_minutes
  } = task;

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: title || '',
    description: description || '',
    category: category || 'General',
    priority: priority || 'medium',
    dueDate: dueDate || '',
    estimated_minutes: estimated_minutes || 30
  });

  const priorityStyles = {
    high: "bg-red-50 text-red-600 border-red-100",
    medium: "bg-amber-50 text-amber-600 border-amber-100",
    low: "bg-emerald-50 text-emerald-600 border-emerald-100"
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditData((currentData) => ({
      ...currentData,
      [name]:
        name === 'estimated_minutes'
          ? Number(value)
          : value
    }));
  };

  const handleSave = async () => {
    if (!editData.title.trim()) {
      return;
    }

    await onEditTask(id, editData);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: title || '',
      description: description || '',
      category: category || 'General',
      priority: priority || 'medium',
      dueDate: dueDate || '',
      estimated_minutes: estimated_minutes || 30
    });

    setIsEditing(false);
  };

  return (
    <div
      className={`bg-white p-5 rounded-xl border ${
        completed
          ? 'border-gray-200 bg-gray-50/60 opacity-80'
          : 'border-gray-100'
      } shadow-sm hover:shadow-md transition-all relative space-y-3`}
    >

      {isEditing ? (
        <>
          {/* Edit Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Edit Task
            </h3>

            <button
              onClick={handleCancel}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={editData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Priority
              </label>

              <select
                name="priority"
                value={editData.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>
            </div>

          </div>

          {/* Due Date + Study Time */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={editData.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Study Time (minutes)
              </label>

              <input
                type="number"
                name="estimated_minutes"
                min="1"
                value={editData.estimated_minutes}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

          </div>

          {/* Save / Cancel */}
          <div className="flex justify-end gap-2 pt-2">

            <button
              onClick={handleCancel}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>

          </div>
        </>
      ) : (
        <>
          {/* Top badges row */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              📚 {category || 'General'}
            </span>

            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${
                priorityStyles[priority] || priorityStyles.medium
              }`}
            >
              {priority} Priority
            </span>
          </div>

          {/* Task Content */}
          <div>
            <h3
              className={`font-semibold text-gray-800 text-base ${
                completed
                  ? 'line-through text-gray-400'
                  : ''
              }`}
            >
              {title}
            </h3>

            {description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {/* Study Information */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span>⏱️</span>

              <span>
                {estimated_minutes || 30} min
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span>📅</span>

              <span>
                {dueDate
                  ? `Due: ${dueDate}`
                  : 'No due date'}
              </span>
            </div>
          </div>

          {/* Footer Info & Actions */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">

            <div className="flex items-center gap-1">
              {completed ? (
                <>
                  <span>✅</span>
                  Completed
                </>
              ) : (
                <>
                  <span>📖</span>
                  Study Task
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">

              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md transition-colors"
                title="Edit Task"
              >
                ✏️
              </button>

              <button
                onClick={() =>
                  onToggleComplete(id, completed)
                }
                className={`p-1.5 rounded-md transition-colors ${
                  completed
                    ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
                title={
                  completed
                    ? "Mark Pending"
                    : "Mark Complete"
                }
              >
                {completed ? '↩️' : '✅'}
              </button>

              <button
                onClick={() => onDeleteTask(id)}
                className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                title="Delete Task"
              >
                🗑️
              </button>

            </div>
          </div>
        </>
      )}

    </div>
  );
}
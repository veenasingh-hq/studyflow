import React from 'react';

export default function TaskDetails({
  task,
  onClose,
  onEdit,
  onToggleComplete,
  onDelete
}) {
  if (!task) {
    return null;
  }

  const priorityStyles = {
    high: 'bg-red-50 text-red-600 border-red-100',
    medium: 'bg-amber-50 text-amber-600 border-amber-100',
    low: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              📋 Task Details
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {task.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Description */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">
              Description
            </p>

            <p className="text-gray-800">
              {task.description || 'No description provided.'}
            </p>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-gray-500">
                Category
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                📚 {task.category || 'General'}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-gray-500">
                Priority
              </p>

              <span
                className={`mt-1 inline-block rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
                  priorityStyles[task.priority] ||
                  priorityStyles.medium
                }`}
              >
                {task.priority} Priority
              </span>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-gray-500">
                Estimated Study Time
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                ⏱️ {task.estimated_minutes || 30} minutes
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-gray-500">
                Due Date
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                📅 {task.dueDate || 'No due date'}
              </p>
            </div>
          </div>

          {/* Smart Information */}
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
            <h3 className="font-semibold text-indigo-900">
              🧠 Smart Task Analysis
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-indigo-600">
                  Priority Score
                </p>

                <p className="mt-1 text-xl font-bold text-indigo-900">
                  {task.priority_score}
                </p>
              </div>

              <div>
                <p className="text-xs text-indigo-600">
                  Urgency
                </p>

                <p className="mt-1 text-xl font-bold capitalize text-indigo-900">
                  {task.urgency}
                </p>
              </div>

              <div>
                <p className="text-xs text-indigo-600">
                  Status
                </p>

                <p className="mt-1 text-xl font-bold text-indigo-900">
                  {task.completed ? 'Completed' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-6">
          <button
            onClick={() => onDelete(task.id)}
            className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            🗑️ Delete
          </button>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onEdit(task)}
              className="rounded-lg bg-indigo-50 px-4 py-2.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100"
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => onToggleComplete(task)}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                task.completed
                  ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
              }`}
            >
              {task.completed
                ? '↩️ Mark Pending'
                : '✅ Mark Complete'}
            </button>

            <button
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
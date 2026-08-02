import React from 'react';

export default function TaskCard({ task }) {
  // Demo task defaults for testing
  const {
    title = "Complete FastAPI Integration",
    description = "Connect frontend React app with FastAPI endpoints using Fetch/Axios.",
    category = "Coding",
    priority = "high",
    completed = false,
    dueDate = "2026-08-05"
  } = task || {};

  const priorityStyles = {
    high: "bg-red-50 text-red-600 border-red-100",
    medium: "bg-amber-50 text-amber-600 border-amber-100",
    low: "bg-emerald-50 text-emerald-600 border-emerald-100"
  };

  return (
    <div className={`bg-white p-5 rounded-xl border ${completed ? 'border-gray-200 bg-gray-50/50' : 'border-gray-100'} shadow-sm hover:shadow-md transition-shadow relative space-y-3`}>
      {/* Top badges row */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
          📚 {category}
        </span>

        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${priorityStyles[priority]}`}>
          {priority} Priority
        </span>
      </div>

      {/* Task Content */}
      <div>
        <h3 className={`font-semibold text-gray-800 text-base ${completed ? 'line-through text-gray-400' : ''}`}>
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span>📅</span> Due: {dueDate}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-md transition-colors" title="Mark Complete">
            ✅
          </button>
          <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-md transition-colors" title="Edit Task">
            ✏️
          </button>
          <button className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition-colors" title="Delete Task">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
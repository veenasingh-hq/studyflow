import React from 'react';

export default function TaskCard({ task, onToggleComplete, onDeleteTask }) {
  const {
    id,
    title,
    description,
    category,
    priority,
    completed,
    dueDate
  } = task;

  const priorityStyles = {
    high: "bg-red-50 text-red-600 border-red-100",
    medium: "bg-amber-50 text-amber-600 border-amber-100",
    low: "bg-emerald-50 text-emerald-600 border-emerald-100"
  };

  return (
    <div className={`bg-white p-5 rounded-xl border ${completed ? 'border-gray-200 bg-gray-50/60 opacity-80' : 'border-gray-100'} shadow-sm hover:shadow-md transition-all relative space-y-3`}>
      {/* Top badges row */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
          📚 {category || 'General'}
        </span>

        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${priorityStyles[priority] || priorityStyles.medium}`}>
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
          <span>📅</span> {dueDate ? `Due: ${dueDate}` : 'No due date'}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleComplete(id, completed)}
            className={`p-1.5 rounded-md transition-colors ${completed ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
            title={completed ? "Mark Pending" : "Mark Complete"}
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
    </div>
  );
}
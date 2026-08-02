import React from 'react';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Student! 👋</h1>
        <p className="text-gray-500 mt-1">Here is a quick overview of your daily study goals and tasks.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">2</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl font-bold">📋</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">1</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-xl font-bold">⏳</div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">1</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xl font-bold">✅</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Task Form */}
        <div className="lg:col-span-1">
          <TaskForm />
        </div>

        {/* Right Column: Task Cards List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span>📋</span> Your Tasks
          </h2>

          <div className="space-y-3">
            <TaskCard task={{
              title: "Revise React useEffect & State Hooks",
              description: "Practice state updates and lifecycle side effects with sample projects.",
              category: "Web Dev",
              priority: "high",
              completed: false,
              dueDate: "2026-08-03"
            }} />

            <TaskCard task={{
              title: "Read Chapter 4 Data Structures",
              description: "Solve array and stack problems from textbook.",
              category: "CS Fundamentals",
              priority: "medium",
              completed: true,
              dueDate: "2026-08-01"
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';

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
        {/* Card 1: Total Tasks */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">0</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl font-bold">
            📋
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">0</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-xl font-bold">
            ⏳
          </div>
        </div>

        {/* Card 3: Completed */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">0</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xl font-bold">
            ✅
          </div>
        </div>
      </div>

      {/* Main Content Area (Form & List Layout Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Task Form Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-gray-100 h-64 flex flex-col items-center justify-center text-gray-400 border-dashed border-2">
          <p className="font-medium">➕ Task Form Area</p>
          <p className="text-sm text-gray-400">(Day 2 mein add karenge)</p>
        </div>

        {/* Right Column: Task List Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border-gray-100 h-64 flex flex-col items-center justify-center text-gray-400 border-dashed border-2">
          <p className="font-medium">📋 Task List Area</p>
          <p className="text-sm text-gray-400">(Day 2 mein add karenge)</p>
        </div>
      </div>
    </div>
  );
}
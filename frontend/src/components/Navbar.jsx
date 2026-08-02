import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-xl tracking-tight">StudyFlow</span>
          </div>

          {/* Right side stats/badge */}
          <div className="flex items-center space-x-4">
            <span className="bg-indigo-700 text-indigo-100 text-xs px-3 py-1 rounded-full font-medium">
              Student Productivity
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
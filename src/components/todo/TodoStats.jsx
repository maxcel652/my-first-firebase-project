import React from 'react'

export function TodoStats({ activeTodos, completedTodos, trashedTodos }) {
  const totalTodos = activeTodos.length + completedTodos.length + trashedTodos.length;
  const completedCount = completedTodos.length;
  const activeCount = activeTodos.length;
  const trashedCount = trashedTodos.length;
  
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalTodos}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{activeCount}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{trashedCount}</div>
            <div className="text-sm text-gray-600">Trashed </div>
          </div>
        </div>
      </div>
    );
  }
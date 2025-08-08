import React from 'react'

import { TodoItem } from './TodoItem';

export function TodoList({todos, currentView, onUpdate, onDelete, onToggle, onRestore, onDeletePermanently }) {

  // function to handle the time a todo was created

  const todoCreationDate = (timespamp) =>{
    if(!timespamp) return '';

    const date = timespamp.toDate();

    return date.toLocaleString();

  }

  const noTodosMessage = () => {
    switch (currentView) {
      case 'todos':
        return 'Add your first todo to get started!';
      case 'completed':
        return 'You have no completed todos yet.';
      case 'trash':
        return 'Your trash is empty!';
      default:
        return 'No todos found.';
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No todos found</h3>
        <p className="text-gray-500">
        {noTodosMessage()}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
          onRestore={onRestore}
          onDeletePermanently={onDeletePermanently}
          creationDate={todoCreationDate(todo.createdAt)}
          currentView={currentView}
        />
      ))}
    </div>
  );
}
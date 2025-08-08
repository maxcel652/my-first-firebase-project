import React from 'react'

import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Check, X, Edit2, Trash2, Save, RotateCcw } from 'lucide-react';
import { clsx } from 'clsx';

export function TodoItem({ todo, onUpdate, onDelete, onToggle, creationDate, onRestore, currentView,     onDeletePermanently
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim()
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const VIEWS = { TODOS: 'todos', COMPLETED: 'completed', TRASH: 'trash' };


  return (
    <div className={clsx(
      'bg-white rounded-lg border shadow-sm p-4 transition-all',
      todo.completed && 'opacity-75'
    )}>
      <div className="flex items-start gap-3">
        {currentView === VIEWS.TODOS &&(
        <button
          onClick={() => onToggle(todo.id, !todo.completed)}
          className={clsx(
            'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
            todo.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-primary-500'
          )}
        >
          {todo.completed && <Check className="w-3 h-3" />}
        </button>
        )}

        <div className="flex-grow min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-sm"
              />
              <Input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
                className="text-sm"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-5 h-5 mr-1 bg-amber-600 cursor-pointer" />
                  Save
                </Button>
                <Button size="sm" variant="secondary" onClick={handleCancel}>
                  <X className="w-3 h-3 mr-1 cursor-pointer" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={clsx(
                'font-medium text-gray-900',
                
              )}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className={clsx(
                  'text-sm text-gray-600 mt-1',
                  
                )}>
                  {todo.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
              {currentView === VIEWS.TODOS && (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(todo.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </>
                )}


                {currentView === VIEWS.TRASH && (
                  <>
                    <button
                      onClick={() => onRestore(todo.id)}
                      className="p-2 text-green-400 rounded-md hover:text-green-600 hover:bg-green-50"
                      title="Restore"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDeletePermanently(todo.id)}
                        
                      className="p-2 text-red-400 rounded-md hover:text-red-600 hover:bg-red-50"
                      title="Delete Permanently"
                    >
                      <Trash2 className="w-5 h-5" /> 
                    </button>
                  </>
                )}
                   
                  
                  <>
                    {currentView === VIEWS.COMPLETED && (
                  
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onToggle(todo.id, false)}
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Uncheck
                    </Button>
                  )}
                
                </>
              
                 
              </div>
            </>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Created on: {creationDate}
          </p>
        </div>
      </div>
    </div>
  );
}
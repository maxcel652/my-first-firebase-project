import React from 'react'

import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus } from 'lucide-react';

export function TodoForm({ onSubmit, disabled }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority: 'medium'
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="title"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={disabled}
          required
        />
        <Input
          id="description"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={disabled}
        />
      </div>
      <Button 
        type="submit" 
        disabled={disabled || !title.trim()}
        className="w-full md:w-auto"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Todo
      </Button>
    </form>
  );
}
import React from 'react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus } from 'lucide-react';

// MODIFICATION: The component now accepts `userId` as a prop.
export function TodoForm({ onSubmit, disabled, userId, userName }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // MODIFICATION: The `userId` is now included in the data object.
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority: 'medium',
      userId: userId, // <--- This is the key addition
      userName:userName
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p>
        Hi {userName || 'there'}, organize your tasks here.
      </p>
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
        className="w-full md:w-auto bg-amber-950"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Todo
      </Button>
    </form>
  );
}
// src/hooks/useTodos.js

import { useState, useEffect } from 'react';
import { TodoService } from '../services/todoService';
import { toast } from 'react-toastify';

export function useTodos(userId) {
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [trashedTodos, setTrashedTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    // Set loading to true to ensure we show a loading state
    // when the userId becomes available.
    setLoading(true);

    const unsubscribeActive = TodoService.subscribeToActiveTodos(userId, (newTodos) => {
      setActiveTodos(newTodos);
    });

    const unsubscribeCompleted = TodoService.subscribeToCompletedTodos(userId, (newTodos) => {
      setCompletedTodos(newTodos);
    });

    const unsubscribeTrashed = TodoService.subscribeToTrashedTodos(userId, (newTodos) => {
      setTrashedTodos(newTodos);
    });

    // We only set loading to false after all subscriptions have completed their initial fetch.
    // This is a more reliable way to manage loading state with multiple fetches.
    // We'll use a timeout to wait a moment for all subscriptions to be active.
    const allSubscriptionsActive = setTimeout(() => {
      setLoading(false);
    }, 500); // 500ms delay to ensure all initial data is fetched

    return () => {
      // FIX: The cleanup function had a syntax error.
      // This is the correct way to call multiple functions.
      unsubscribeActive();
      unsubscribeCompleted();
      unsubscribeTrashed();
      clearTimeout(allSubscriptionsActive);
    };
  }, [userId]);

  const addTodo = async (todoData) => {
    try {
      setError(null);
      await TodoService.addTodo(todoData);
      toast.success("Todo added");
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
      toast.error('Failed to add todo.');
    }
  };

  const moveTodoToTrash = async (id)=>{
    try {
      await TodoService.moveTodoToTrash(id);
      toast.success('Todo moved to Trash.');
    } catch (error) {
      setError('Failed to move todo to trash');
      console.error(error);
      toast.error('Failed to move todo to trash');
    }
  };

  const restoreTodo = async (id) => {
    try {
      await TodoService.restoreTodo(id);
      toast.success('Todo restored successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to restore todo.');
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      setError(null);
      await TodoService.updateTodo(id, updates);
      toast.success('Todo updated');
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
      toast.error('Failed to update todo.');
    }
  };

  const deleteTodoPermanently = async (id) => {
    try {
      setError(null);
      await TodoService.deleteTodoPermanently(id);
      toast.success('Todo deleted permanently');
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
      toast.error('Failed to delete todo permanently.');
    }
  };

  const deleteTodo = (id) => moveTodoToTrash(id);

  const toggleTodo = async (id, completed) => {
    try {
      setError(null);
      await TodoService.toggleTodo(id, completed);
      toast.success(`Todo marked as ${completed ? 'completed' : 'incomplete'}.`);
    } catch (err) {
      setError('Failed to toggle todo');
      console.error(err);
      toast.error('Failed to toggle todo.');
    }
  };

  return {
    activeTodos,
    completedTodos,
    trashedTodos,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    restoreTodo,
    deleteTodoPermanently,
  };
}
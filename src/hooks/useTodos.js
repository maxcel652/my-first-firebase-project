import { useState, useEffect } from 'react';
import { TodoService } from '../services/todoService';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = TodoService.subscribeToTodos((newTodos) => {
      setTodos(newTodos);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (todoData) => {
    try {
      setError(null);
      await TodoService.addTodo(todoData);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      setError(null);
      await TodoService.updateTodo(id, updates);
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError(null);
      await TodoService.deleteTodo(id);
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      setError(null);
      await TodoService.toggleTodo(id, completed);
    } catch (err) {
      setError('Failed to toggle todo');
      console.error(err);
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  };
}
import { useState, useEffect } from 'react';
import { TodoService } from '../services/todoService';

//  hook now accepts the currently logged-in user's ID.
export function useTodos(userId) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We now pass the userId to the subscription service.
    // This tells `TodoService` to only listen for changes to todos
    // that belong to this specific user.
    const unsubscribe = TodoService.subscribeToTodos(userId, (newTodos) => {
      setTodos(newTodos);
      setLoading(false);
    });

    return () => unsubscribe();
  //  We add `userId` to the dependency array.
  // This ensures the effect (the real-time listener) is re-run
  // whenever the `userId` changes (e.g., when a user logs in or out).
  }, [userId]);

  const addTodo = async (todoData) => {
    try {
      setError(null);
      // The `addTodo` service now needs the userId.
      // We'll pass the new todo data which should contain the userId.
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
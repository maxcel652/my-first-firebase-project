import { useState, useEffect } from 'react';
import { TodoService } from '../services/todoService';
import toast from 'react-hot-toast';

//  accepting userId
export function useTodos(userId) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // passing user Id to todoservice
    const unsubscribe = TodoService.subscribeToTodos(userId, (newTodos) => {
      setTodos(newTodos);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTodo = async (todoData) => {
    try {
      setError(null);
      await TodoService.addTodo(todoData);
      toast.success("Todo added")
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
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
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError(null);
      await TodoService.deleteTodo(id);
      toast.success('Todo deleted')
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
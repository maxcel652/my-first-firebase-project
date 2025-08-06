import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const COLLECTION_NAME = 'todos';

export class TodoService {
  // Get all todos with real-time updates
  static subscribeToTodos(callback) {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const todos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(todos);
    });
  }

  // Add new todo
  static async addTodo(todoData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...todoData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  // Update todo
  static async updateTodo(id, updates) {
    try {
      const todoRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(todoRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  // Delete todo
  static async deleteTodo(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }

  // Toggle todo completion
  static async toggleTodo(id, completed) {
    return this.updateTodo(id, { completed });
  }
}
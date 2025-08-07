import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where, // <-- New: We need this to filter by user ID
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const COLLECTION_NAME = 'todos';

export class TodoService {
  // MODIFICATION: This method now accepts the user's ID to filter the todos.
  static subscribeToTodos(userId, callback) {
    // FIX: We check if `userId` is valid. If not, we return an empty array
    // and a no-op function to prevent a database query error.
    if (!userId) {
      callback([]);
      return () => {};
    }

    //  We add a `where` clause to the query.
    // This tells Firestore to only fetch documents where the 'userId' field
    // is equal to the `userId` of the currently logged-in user.
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
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

  // This method is now structured to accept a complete `todoData` object,
  // which is expected to already contain the `userId`.
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

  // The rest of the methods are correct as they work on a single document ID.

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

  static async deleteTodo(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }

  static async toggleTodo(id, completed) {
    return this.updateTodo(id, { completed });
  }
}
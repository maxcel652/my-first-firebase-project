import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where, 
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const COLLECTION_NAME = 'todos';

export class TodoService {
// only fetch active todos
  static subscribeToActiveTodos(userId, callback) {
    if (!userId) {
      callback([]);
      return () => {};
    }
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      where('completed', '==', false),
      where('isTrashed', '==', false),
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
// only  fetch completed todos
static subscribeToCompletedTodos(userId, callback) {
  if (!userId) {
    callback([]);
    return () => {};
  }
  const q = query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', userId),
    where('completed', '==', true),
    where('isTrashed', '==', false),
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
// only fetch todos inside the trash
static subscribeToTrashedTodos(userId, callback) {
  if (!userId) {
    callback([]);
    return () => {};
  }
  const q = query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', userId),
    where('completed', '==', false),
    where('isTrashed', '==', true),
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
        isTrashed:false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }


// sending todo to trash
  static async moveTodoToTrash(id){
    return this.updateTodo(id, {isTrashed: true});
  }

  // restoring todod from trash
  static async restoreTodo(id){
    return this.updateTodo(id, {isTrashed: false});
  }

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
// permanently delete todo in trash
  static async deleteTodoPermanently(id) {
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
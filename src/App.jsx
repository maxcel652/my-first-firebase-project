// src/App.jsx

import { useTodos } from './hooks/useTodos';
import { useAuth } from './hooks/useAuth'; // Import the new useAuth hook
import { TodoForm } from './components/todo/TodoForm';
import { TodoList } from './components/todo/TodoList';
import { TodoStats } from './components/todo/TodoStats';
import LoginPage from './pages/LoginPage';
import { Logout } from './services/userLogin';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Button } from './components/ui/Button';
import SignupPage from './pages/SignupPage';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { ListTodo, TrashIcon, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

// views for fetching either completed, active or trashed todos

const VIEWS  = {
  TODOS: 'todos',
  COMPLETED: 'completed',
  TRASH: 'trash',
}


function App() {
  const { user, loading: authLoading } = useAuth(); 
  const [currentView, setCurrentView] = useState(VIEWS.TODOS);
  const {
    activeTodos,
    completedTodos,
    trashedTodos,
    todos,
    loading: todosLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    restoreTodo,
    deleteTodoPermanently,
    toggleTodo,
  } = useTodos(user?.uid); 

  const navigate = useNavigate();

  // Combine both loading states
  if (authLoading || todosLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await Logout();
    toast.success('Logout successful')
    navigate('/login');
  };

    // switch between the current view to display a particular set of todos
  const getTodosForView = ()=>{
    switch (currentView) {
      case VIEWS.TODOS:
        return activeTodos;
      case VIEWS.COMPLETED:
        return completedTodos;
      case VIEWS.TRASH:
        return trashedTodos;
    
      default:
        activeTodos
    }
  }
  // handle todo list display
  const getTodoList = ()=>{
    switch (currentView) {
      case VIEWS.TODOS:
        return {
          onUpdate: updateTodo,
          onDelete: deleteTodo,
          onToggle: toggleTodo,
          onRestore: restoreTodo,
          onDeletePermanently: deleteTodoPermanently,
        };
      case VIEWS.COMPLETED:
        return{
          onDelete: deleteTodo,
          onToggle:toggleTodo,
        };
      case VIEWS.TRASH:
        return {
          onRestore: restoreTodo,
          onDeletePermanently: deleteTodoPermanently,
          onUpdate: updateTodo, // Required for the TodoItem component
          onDelete: deleteTodo,
        };
    
      default:
        return {};
    }
  }
  return (
    <>
      <ToastContainer position='top-right'/>

    <Routes>
      <Route
        path="/"
        element={
          user ? ( 
            <div className="min-h-screen bg-gray-50">
              <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <header className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    <p>Welcome {user.displayName}</p>
                  </h1>
                  <p className="text-gray-600">
                    Manage your tasks effeciently with Maxcel's Todo App.
                  </p>

                  <div className=' flex justify-center mt-4 space-x-4'>
                    <Button 
                    onClick={()=> setCurrentView(VIEWS.TODOS)}
                    variant={currentView ===VIEWS.TODOS ? 'solid' :'ghost'}
                    className={`font-semibold ${currentView===VIEWS.TODOS? 'bg-amber-900 text-white': 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      <ListTodo className=' w-4 h-4 mr-2'/>My Todos
                    </Button>

                    <Button
                        onClick={() => setCurrentView(VIEWS.COMPLETED)}
                        variant={currentView === VIEWS.COMPLETED ? 'solid' : 'ghost'}
                        className={`font-semibold ${currentView === VIEWS.COMPLETED ? 'bg-amber-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        <CheckCircle2 className='w-4 h-4 mr-2' /> Completed
                      </Button>

                    <Button
                    onClick={()=> setCurrentView(VIEWS.TRASH)}
                    variant={currentView === VIEWS.TRASH ? 'solid': 'ghost'}
                    className={`font-semibold ${currentView === VIEWS.TRASH ? 'bg-amber-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}

                    >
                      <TrashIcon className=' w-4 h-4 mr-2'/> Trash
                    </Button>
                  </div>
                </header>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {currentView === VIEWS.TODOS && (
                    <div className="bg-white rounded-lg border shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Add New Todo
                      </h2>
                      {/* MODIFICATION: Pass the current user's ID to the TodoForm */}
                      <TodoForm onSubmit={addTodo}
                      
                      disabled={todosLoading} 
                      
                      userName={user.displayName}
                      userId={user.uid} />
                    </div>
                    )}

                    {/* Todo List */}
                    <div className="bg-white rounded-lg border shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {currentView === VIEWS.TODOS ? 'Your Todos' : (currentView === VIEWS.COMPLETED ? 'Completed Todos' : 'Trash')} ({getTodosForView().length})
                      </h2>
                      <TodoList
                        todos={getTodosForView()}
                        currentView={currentView} 
                        {...getTodoList()}
                      />
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                  <TodoStats 
                      activeTodos={activeTodos}
                      completedTodos={completedTodos}
                      trashedTodos={trashedTodos} />
                  <Button className='bg-amber-950'
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
     

        <Route className=' max-w-4xl mx-auto px-4 py-8' path="/login" element={<LoginPage />} />

        <Route className=' max-w-4xl mx-auto px-4 py-8' path='/signup' element={<SignupPage/>} />
    </Routes>
    </>
  );
}

export default App;
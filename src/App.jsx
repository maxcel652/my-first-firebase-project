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
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { user, loading: authLoading } = useAuth(); 
  const {
    todos,
    loading: todosLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
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

  return (
    <>
        <Toaster 
        position="top-right" // You can customize the position here
        toastOptions={{
          success: { style: { background: 'green', color: 'white' } },
          error: { style: { background: 'red', color: 'white' } },
        }}
      />

    <Routes>
      <Route
        path="/"
        element={
          user ? ( // Now check the user object directly
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
                </header>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Add Todo Form */}
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

                    {/* Todo List */}
                    <div className="bg-white rounded-lg border shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Your Todos ({todos.length})
                      </h2>
                      <TodoList
                        todos={todos}
                        onUpdate={updateTodo}
                        onDelete={deleteTodo}
                        onToggle={toggleTodo}
                      />
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <TodoStats todos={todos} />
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
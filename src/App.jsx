
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/todo/TodoForm';
import { TodoList } from './components/todo/TodoList';
import { TodoStats } from './components/todo/TodoStats';

function App() {
  const { 
    todos, 
    loading, 
    error, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    toggleTodo 
  } = useTodos();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Traitz Todo App
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently with Firebase & React 19
          </p>
        </header>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Todo Form */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Add New Todo
              </h2>
              <TodoForm onSubmit={addTodo} disabled={loading} />
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
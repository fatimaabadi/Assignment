import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const App = () => {
  // Initialize todos from localStorage safely
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Error reading todos from localStorage:', err);
      return [];
    }
  });

  const [filter, setFilter] = useState('All');

  // Persist todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (err) {
      console.error('Error saving todos to localStorage:', err);
    }
  }, [todos]);

  // Add new todo
  const addTodo = (todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  // Toggle completed status
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mt-4">
      <Header />

      {/* Centered form */}
      <div className="d-flex justify-content-center mb-3">
        <div className="w-100" style={{ maxWidth: '600px' }}>
          <TodoInput addTodo={addTodo} />
        </div>
      </div>

      {/* Centered filter buttons with spacing */}
      <div className="d-flex justify-content-center flex-wrap mt-3 mb-3 gap-2 px-2">
        {['All', 'Active', 'Completed'].map((f) => (
          <button
            key={f}
            className={`btn ${filter === f ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        filter={filter}
      />
    </div>
  );
};

export default App;

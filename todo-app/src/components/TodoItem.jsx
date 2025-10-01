import React, { useState, useEffect } from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  const [highlight, setHighlight] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [checkedAnimate, setCheckedAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHighlight(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => deleteTodo(todo.id), 500);
  };

  const handleToggle = () => {
    toggleComplete(todo.id);
    setCheckedAnimate(true);
    setTimeout(() => setCheckedAnimate(false), 500);
  };

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-start flex-wrap
        ${highlight ? 'new-task-highlight' : ''}
        ${removing ? 'fade-out' : ''}`}
    >
      <div className="d-flex flex-column flex-grow-1">
        <div className="d-flex align-items-center gap-2">
          <input
            type="checkbox"
            className={`form-check-input ${checkedAnimate ? 'checkbox-highlight' : ''}`}
            checked={!!todo.completed}
            onChange={handleToggle}
          />
          <span
            className="fw-semibold"
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.title || 'Untitled Task'}
          </span>
        </div>

        {(todo.dueDate || todo.description) && (
          <div className="d-flex flex-wrap gap-2 mt-2">
            {todo.dueDate && <span className="badge bg-pink text-dark">Due: {todo.dueDate}</span>}
            {todo.description && <span className="badge bg-secondary text-dark">{todo.description}</span>}
          </div>
        )}
      </div>

      <button className="btn btn-danger btn-sm mt-2 mt-sm-0" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;

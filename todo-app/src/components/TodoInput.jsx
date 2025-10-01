import React, { useState } from 'react';

const TodoInput = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({ title, description, dueDate, completed: false, id: Date.now() });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        placeholder="Task title"
        className="form-control mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        className="form-control mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="form-control mb-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button className="btn btn-primary w-100" disabled={!title.trim()}>
  Add Task
</button>
    </form>
  );
};

export default TodoInput;

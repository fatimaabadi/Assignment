import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleComplete, deleteTodo, filter }) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  // Sort by due date (optional)
  filteredTodos.sort(
    (a, b) => new Date(a.dueDate || '2100-01-01') - new Date(b.dueDate || '2100-01-01')
  );

  return (
    <ul className="list-group task-list-fade">

      {filteredTodos.length === 0 ? (
        <li className="list-group-item text-center">
          <div className="alert alert-danger mb-0">
            {filter === 'All' && 'No tasks available'}
            {filter === 'Active' && 'No active tasks '}
            {filter === 'Completed' && 'No completed tasks yet'}
          </div>
        </li>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </ul>
  );
};

export default TodoList;



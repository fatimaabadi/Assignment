import React, { useState, useEffect } from 'react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <header className="d-flex justify-content-between align-items-center p-3 mb-3 border-bottom">
      <h1>To-Do List</h1>
      <button className="btn btn-secondary" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
};

export default Header;

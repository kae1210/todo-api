import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { Todo } from './Todo';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/todos" /> : <Login onLoginSuccess={handleLoginSuccess} />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/todos" /> : <Register />
          }
        />
        <Route
          path="/todos"
          element={
            isAuthenticated ? <Todo onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        {/* 初期アクセス時にリダイレクト */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/todos" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

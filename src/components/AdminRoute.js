import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Retrieve login state and role from localStorage (or use a global state management solution)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('userRole');

  // If the user is not logged in OR the role is not admin, redirect them
  if (!isLoggedIn || role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Otherwise, render the admin component
  return children;
};

export default AdminRoute;

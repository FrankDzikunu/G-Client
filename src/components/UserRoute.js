import React from 'react';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Deny access only if the user is not logged in.
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default UserRoute;

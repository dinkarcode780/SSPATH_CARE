import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    // console.log(token, "isAuthenticated");

    const user = JSON.parse(localStorage.getItem('user')); // Parse the user object
    // console.log(user, "user");

    return token && user?.role === 'admin' ? children : <Navigate to="/login" />;
};

export default AdminRoute;

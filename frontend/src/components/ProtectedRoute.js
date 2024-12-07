// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ allowedRoles }) {
    const token = localStorage.getItem('authToken');

    if (!token) {
        // Redirect to login if no token is found
        return <Navigate to="/login" />;
    }

    let userRole;
    try {
        // Decode the token to extract the user role
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.role;
    } catch (error) {
        console.error('Invalid token:', error);
        // Redirect if the token is invalid
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(userRole)) {
        // Redirect to the home page for unauthorized roles
        return <Navigate to="/" />;
    }

    // Render child routes via Outlet
    return <Outlet />;
}

export default ProtectedRoute;

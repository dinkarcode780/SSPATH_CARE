
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const {  loading } = useSelector((state) => state.auth);
    const tokenFromLocalStorage = localStorage.getItem('token');
    console.log("PrivateRoute tokenFromLocalStorage :", tokenFromLocalStorage);
    

    // Show loading state if needed
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Check authentication
    if ( ! tokenFromLocalStorage) {
        return <Navigate to="/login"   />;
    }else{
        return  children;
    }
   
    
};

export default PrivateRoute;
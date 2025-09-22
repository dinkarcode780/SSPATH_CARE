import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logingout, logout } from '../../features/auth/AuthSlice';
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // const handleLogout = async () => {
        //     const token = localStorage.getItem('token');

        //     if (!token) {
        //         navigate('/login'); 
        //         return;
        //     }

        //     try {

        //         await dispatch(logout()).unwrap();
        //         localStorage.removeItem('token');
        //         localStorage.removeItem('user');
        //         dispatch(logingout());
        //         toast.success('Logout successful');

        //         setTimeout(() => navigate('/login'), 1000);
        //     } catch (error) {
        //         console.error('Error during logout:', error);
        //         alert(error?.message || 'Logout failed. Please try again.');
        //     }
        // };


        const handleLogout = async () => {
            try {
                // Dispatch logout action (this will handle localStorage cleanup)
                await dispatch(logout()).unwrap();

                // Show success message
                toast.success('Logout successful');

                // Navigate to login after a short delay
                setTimeout(() => navigate('/login'), 1000);
            } catch (error) {
                console.error('Error during logout:', error);

                // Even if server logout fails, clear local state
                dispatch(logingout());
                toast.warning('Logged out locally due to server error');
                navigate('/login');
            }
        };


        handleLogout();
    }, [dispatch, navigate]);



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-semibold">Logging out...</h1>
        </div>
    );
};

export default Logout;

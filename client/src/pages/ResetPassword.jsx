import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/auth/AuthSlice';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ token, newPassword }));
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter reset token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;

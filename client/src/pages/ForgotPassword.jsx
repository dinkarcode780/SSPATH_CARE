import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword,  } from '../features/auth/AuthSlice';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;

// import React from "react";
// import  { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { register } from '../../features/auth/AuthSlice';
// import {  toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const SignUpPage = () => {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const userData = {
//                 firstName,
//                 lastName,
//                 phone,
//                 email,
//                 password,
//                 confirmPassword,
//             };
//             await dispatch(register(userData)).unwrap();
//             toast.success('Registration successful! Please login to continue.');
//             navigate('/login');
//         } catch (error) {
//             toast.error('Registration failed. Please try again.');
//         }
//     };

//     return (
//         <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-50 p-4">
//             {/* Signup Form */}
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md lg:w-1/2">
//                 <h2 className="text-2xl font-bold text-center mb-6">Sign Up Now</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">
//                                 First Name:
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="First Name..."
//                                 className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">
//                                 Last Name:
//                             </label>
//                             <input
//                                 type="text"
//                                 placeholder="Last Name..."
//                                 className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
//                                 value={lastName}
//                                 onChange={(e) => setLastName(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Phone:
//                         </label>
//                         <div className="flex items-center space-x-2">
//                             <span className="border px-3 py-2 rounded-lg bg-gray-100">+91</span>
//                             <input
//                                 type="text"
//                                 placeholder="Enter Phone Number"
//                                 className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
//                                 value={phone}
//                                 onChange={(e) => setPhone(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Email:
//                         </label>
//                         <input
//                             type="email"
//                             placeholder="Enter your Email Address..."
//                             className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Password:
//                         </label>
//                         <input
//                             type="password"
//                             placeholder="Enter Password"
//                             className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Confirm Password:
//                         </label>
//                         <input
//                             type="password"
//                             placeholder="Confirm Password"
//                             className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="text-sm text-gray-500">
//                         Your details will be used to process your order and support your
//                         experience as described in our{" "}
//                         <Link to="/terms" className="text-primary underline">
//                             terms & conditions
//                         </Link>
//                         .
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <input
//                             type="checkbox"
//                             id="agree"
//                             className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
//                         />
//                         <label htmlFor="agree" className="text-sm text-gray-700">
//                             I have read and agree to the website terms & conditions *
//                         </label>
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#015545] focus:outline-none"
//                     >
//                         Sign Up
//                     </button>
//                 </form>
//                 <p className="text-sm text-center text-gray-500 mt-4">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-primary underline">
//                         Log In
//                     </Link>
//                 </p>
//             </div>

//             {/* Illustration Section */}
//             <div className="hidden lg:block w-full lg:w-1/2 p-6">
//                 <img
//                     src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=740&t=st=1718014700~exp=1718015300~hmac=77e400316151d5912ae0ce702aafdc177847014a98957e2a56181869e1c4ee09"
//                     alt="Sign Up Illustration"
//                     className="max-w-full h-auto mx-auto"
//                 />
//             </div>
//         </div>
//     );
// };

// export default SignUpPage;






import React from "react";
import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/AuthSlice';
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        
        try {
            const userData = {
                firstName,
                lastName,
                phone,
                email,
                password,
                confirmPassword,
            };
            await dispatch(register(userData)).unwrap();
            toast.success('Registration successful! Please login to continue.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-50 p-4">
            {/* Signup Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md lg:w-1/2">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up Now</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                First Name:
                            </label>
                            <input
                                type="text"
                                placeholder="First Name..."
                                className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                placeholder="Last Name..."
                                className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone:
                        </label>
                        <div className="flex items-center space-x-2">
                            <span className="border px-3 py-2 rounded-lg bg-gray-100">+91</span>
                            <input
                                type="text"
                                placeholder="Enter Phone Number"
                                className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your Email Address..."
                            className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full border-gray-300 p-1 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="text-sm text-gray-500">
                        Your details will be used to process your order and support your
                        experience as described in our{" "}
                        <Link to="/terms" className="text-primary underline">
                            terms & conditions
                        </Link>
                        .
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="agree"
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            disabled={isLoading}
                        />
                        <label htmlFor="agree" className="text-sm text-gray-700">
                            I have read and agree to the website terms & conditions *
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-lg focus:outline-none transition-colors ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-primary text-white hover:bg-[#015545]'
                        }`}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary underline">
                        Log In
                    </Link>
                </p>
            </div>

            {/* Illustration Section */}
            <div className="hidden lg:block w-full lg:w-1/2 p-6">
                <img
                    src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=740&t=st=1718014700~exp=1718015300~hmac=77e400316151d5912ae0ce702aafdc177847014a98957e2a56181869e1c4ee09"
                    alt="Sign Up Illustration"
                    className="max-w-full h-auto mx-auto"
                />
            </div>
        </div>
    );
};

export default SignUpPage;
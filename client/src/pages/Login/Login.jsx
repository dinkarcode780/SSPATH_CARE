// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../../features/auth/AuthSlice';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

    


//     const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//         // Dispatch login action and get the result
//         const result = await dispatch(login({ email, password })).unwrap();
        
//         toast.success("Login successful");
        
    
//         if (result && result.role === 'admin') {
//             navigate('/admin');
//         } else {
//             navigate('/user');
//         }
        
//         // Clear form
//         setEmail('');
//         setPassword('');
        
//     } catch (err) {
//         toast.error(err);
//     }
// };

    
 

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-8">
//                 {/* Form Section */}
//                 <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-6">
//                     <h2 className="text-3xl font-bold mb-6 text-center">Sign In Now</h2>
//                     <div className="mb-4">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                             Email:
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             placeholder="Enter your Email Address..."
//                             className="border p-2 rounded w-full mt-1"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                             Password:
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             placeholder="********"
//                             className="border p-2 rounded w-full mt-1"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="text-right mb-4">
//                         <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
//                             Forgot your password?
//                         </Link>
//                     </div>
//                     <button
//                         type="submit"
//                         className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded w-full">
//                         Sign In
//                     </button>
//                     <div className="mt-4 text-center">
//                         <span className="text-sm">Already Have an Account? </span>
//                         <Link to="/signup" className="text-red-500 hover:underline text-sm">
//                             Sign up
//                         </Link>
//                     </div>
//                 </form>
//                 {/* Illustration Section */}
//                 <div className="hidden md:block md:w-1/2">
//                     <img
//                         src="https://img.freepik.com/free-vector/my-password-concept-illustration_114360-4294.jpg?size=626&ext=jpg"
//                         alt="Illustration"
//                         className="max-w-full h-auto"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;







import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/AuthSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        
        try {
            // Dispatch login action and get the result
            const result = await dispatch(login({ email, password })).unwrap();
            
            toast.success("Login successful");
            
        
            if (result && result.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
            
            // Clear form
            setEmail('');
            setPassword('');
            
        } catch (err) {
            toast.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-8">
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-6">
                    <h2 className="text-3xl font-bold mb-6 text-center">Sign In Now</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your Email Address..."
                            className="border p-2 rounded w-full mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="********"
                            className="border p-2 rounded w-full mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="text-right mb-4">
                        <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`font-medium py-2 px-4 rounded w-full transition-colors ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-primary hover:bg-secondary text-white'
                        }`}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                    <div className="mt-4 text-center">
                        <span className="text-sm">Already Have an Account? </span>
                        <Link to="/signup" className="text-red-500 hover:underline text-sm">
                            Sign up
                        </Link>
                    </div>
                </form>
                {/* Illustration Section */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="https://img.freepik.com/free-vector/my-password-concept-illustration_114360-4294.jpg?size=626&ext=jpg"
                        alt="Illustration"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
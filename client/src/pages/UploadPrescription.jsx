
// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { prescription } from '../features/prescription/prescriptionSlice';
// import { toast } from 'react-toastify';
// import PrescriptionPage from './userprescription/PrescriptionPage';

// const UploadPrescription = () => {
//     const [formData, setFormData] = useState({
//         message: '',
//         city: '',
//         file: null,
//     });


//     const dispatch = useDispatch();

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFormData({
//             ...formData,
//             file: selectedFile,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         if (!formData.file) {
//             toast.error('Please select a file to upload.');
//             return;
//         }

//         if (formData.file.size > 5 * 1024 * 1024) {
//             toast.error('File size must be less than 5MB.');
//             return;
//         }

//         const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//         if (!allowedTypes.includes(formData.file.type)) {
//             toast.error('Invalid file type. Only .jpeg, .png, or .pdf are allowed.');
//             return;
//         }
        
//         if (!formData.city) {
//             toast.error('Please select a city.');
//             return;
//         }

//         try {
//             await dispatch(prescription(formData)).unwrap();
//             toast.success('Prescription uploaded successfully!');
//             setFormData({
//                 message: '',
//                 city: '',
//                 file: null,
//             });
//             // Reset the file input
//             const fileInput = document.querySelector('input[type="file"]');
//             if (fileInput) {
//                 fileInput.value = '';
//             }
//         } catch (error) {
//             console.error('Error uploading prescription:', error);
//             toast.error(error.message || 'Failed to upload prescription. Please try again.');
//         }
//     };

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     return (
//         <div className="">
//             <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 px-4">
//                 <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
//                     <h1 className="text-2xl font-bold text-gray-800 mb-4">Upload Prescription</h1>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <textarea
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Message Optional"
//                             value={formData.message}
//                             onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                             rows="4"
//                         />
                        
//                         <select
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={formData.city}
//                             onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                             required
//                         >
//                             <option value="" disabled>Select Your City</option>
//                             <option value="Bhopal">Bhopal</option>
//                             <option value="Indore">Indore</option>
//                             <option value="Gwalior">Gwalior</option>
//                             <option value="Ujjain">Ujjain</option>
//                         </select>
                        
//                         <div className="space-y-2">
//                             <input
//                                 type="file"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 onChange={handleFileChange}
//                                 accept=".jpeg,.jpg,.png,.pdf"
//                                 required
//                             />
//                             {formData.file && (
//                                 <div className="text-sm text-gray-600">
//                                     Selected: {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
//                                 </div>
//                             )}
//                         </div>
                        
//                         <button
//                             type="submit"
//                             className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-200 font-medium"
//                         >
//                             Submit
//                         </button>
//                     </form>
//                 </div>
                
//                 <div className="hidden lg:block w-full lg:w-1/2 p-6">
//                     <img
//                         src="https://static.vecteezy.com/system/resources/previews/015/252/578/non_2x/doctor-writing-prescription-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg"
//                         alt="Sign Up Illustration"
//                         className="max-w-full h-auto mx-auto"
//                         loading="lazy"
//                     />
//                 </div>
//             </div>
//             <PrescriptionPage />
//         </div>
//     );
// };

// export default UploadPrescription;










import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { prescription } from '../features/prescription/prescriptionSlice';
import { toast } from 'react-toastify';
import PrescriptionPage from './userprescription/PrescriptionPage';

const UploadPrescription = () => {
    // Step 1: Add a new state variable to track the submission status
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        message: '',
        city: '',
        file: null,
    });

    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData({
            ...formData,
            file: selectedFile,
        });
    };

    // Step 2: Update the handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent multiple submissions if already submitting
        if (isSubmitting) {
            return;
        }

        if (!formData.file) {
            toast.error('Please select a file to upload.');
            return;
        }

        if (formData.file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB.');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(formData.file.type)) {
            toast.error('Invalid file type. Only .jpeg, .png, or .pdf are allowed.');
            return;
        }
        
        if (!formData.city) {
            toast.error('Please select a city.');
            return;
        }

        // Set submitting state to true before the request
        setIsSubmitting(true);

        try {
            await dispatch(prescription(formData)).unwrap();
            toast.success('Prescription uploaded successfully!');
            setFormData({
                message: '',
                city: '',
                file: null,
            });
            // Reset the file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.value = '';
            }
        } catch (error) {
            console.error('Error uploading prescription:', error);
            toast.error(error.message || 'Failed to upload prescription. Please try again.');
        } finally {
            // Reset submitting state to false whether the request succeeded or failed
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="">
            <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 px-4">
                <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Upload Prescription</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Message Optional"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows="4"
                        />
                        
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Your City</option>
                            <option value="Bhopal">Bhopal</option>
                            <option value="Indore">Indore</option>
                            <option value="Gwalior">Gwalior</option>
                            <option value="Ujjain">Ujjain</option>
                        </select>
                        
                        <div className="space-y-2">
                            <input
                                type="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleFileChange}
                                accept=".jpeg,.jpg,.png,.pdf"
                                required
                            />
                            {formData.file && (
                                <div className="text-sm text-gray-600">
                                    Selected: {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                                </div>
                            )}
                        </div>
                        
                        {/* Step 3: Modify the button element */}
                        <button
                            type="submit"
                            // Disable the button while the form is submitting
                            disabled={isSubmitting}
                            className={`w-full text-white py-2 rounded-md transition-colors duration-200 font-medium ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
                        >
                            {/* Change button text based on submission status */}
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
                
                <div className="hidden lg:block w-full lg:w-1/2 p-6">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/015/252/578/non_2x/doctor-writing-prescription-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg"
                        alt="Sign Up Illustration"
                        className="max-w-full h-auto mx-auto"
                        loading="lazy"
                    />
                </div>
            </div>
            <PrescriptionPage />
        </div>
    );
};

export default UploadPrescription;
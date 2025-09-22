// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createBooking } from "../../features/booking/bookingSlice";
// import { fetchTests } from "../../features/test/testSlice";
// import { fetchUsers } from "../../features/auth/AuthSlice";
// import { fetchPackages } from "../../features/package/packageSlice";

// const CreateBooking = () => {
//     const dispatch = useDispatch();

//     // State for form visibility
//     const [isFormVisible, setIsFormVisible] = useState(false);

//     // Local state for form data
//     const [formData, setFormData] = useState({
//         userId: "",
//         packageId: "",
//         tests: [],
//     });

//     // Fetching users, packages, and tests from Redux store
//     const { users } = useSelector((state) => state.auth);
//     const { packages } = useSelector((state) => state.packages);
//     const { tests } = useSelector((state) => state.tests);

//     // Fetch data on component mount
//     useEffect(() => {
//         dispatch(fetchUsers());
//         dispatch(fetchPackages());
//         dispatch(fetchTests());
//     }, [dispatch]);

//     // Form change handlers
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleTestChange = (testId) => {
//         const isSelected = formData.tests.includes(testId);
//         if (isSelected) {
//             setFormData({
//                 ...formData,
//                 tests: formData.tests.filter((id) => id !== testId),
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 tests: [...formData.tests, testId],
//             });
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(createBooking(formData));
//         // Reset form and hide it after submission
//         setFormData({ userId: "", packageId: "", tests: [] });
//         setIsFormVisible(false);
//     };

//     return (
//         <div className="p-4 bg-gray-100">
//             {/* Create Booking Button */}
//             <button
//                 onClick={() => setIsFormVisible(!isFormVisible)}
//                 className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-secondary"
//             >
//                 {isFormVisible ? "Close Form" : "Create Booking"}
//             </button>

//             {/* Conditional Rendering of the Form */}
//             {isFormVisible && (
//                 <div className="flex items-center justify-center bg-gray-100 p-4 mt-6">
//                     <form
//                         onSubmit={handleSubmit}
//                         className="w-full max-w-lg p-6 bg-white rounded shadow-lg space-y-4"
//                     >
//                         <h2 className="text-2xl font-bold text-center text-gray-700">Create Booking</h2>

//                         {/* User Dropdown */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600">Select User</label>
//                             <select
//                                 name="userId"
//                                 value={formData.userId}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//                                 required
//                             >
//                                 <option value="" disabled>
//                                     -- Select User --
//                                 </option>
//                                 {users?.map((user) => (
//                                     <option key={user._id} value={user._id}>
//                                         {user.firstName} {user.lastName}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Package Dropdown */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600">Select Package</label>
//                             <select
//                                 name="packageId"
//                                 value={formData.packageId}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//                                 required
//                             >
//                                 <option value="" disabled>
//                                     -- Select Package --
//                                 </option>
//                                 {packages?.map((pkg) => (
//                                     <option key={pkg._id} value={pkg._id}>
//                                         {pkg.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Test Checkboxes */}
//                         <div>
//                             <h3 className="text-sm font-medium text-gray-600">Select Tests</h3>
//                             <div className="flex flex-wrap gap-2 mt-2">
//                                 {tests?.map((test) => (
//                                     <label
//                                         key={test.id}
//                                         className="flex items-center space-x-2"
//                                     >
//                                         <input
//                                             type="checkbox"
//                                             value={test.id}
//                                             checked={formData.tests.includes(test._id)}
//                                             onChange={() => handleTestChange(test._id)}
//                                             className="rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-200"
//                                         />
//                                         <span className="text-sm text-gray-600">{test.name}</span>
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             className="w-full px-4 py-2 text-white bg-primary rounded shadow hover:bg-secondary focus:outline-none focus:ring focus:ring-green-200"
//                         >
//                             Submit
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CreateBooking;




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, fetchBookings } from "../../features/booking/bookingSlice";
import { fetchTests } from "../../features/test/testSlice";
import { fetchUsers } from "../../features/auth/AuthSlice";
import { fetchPackages } from "../../features/package/packageSlice";
import { toast } from "react-toastify";

const CreateBooking = () => {
    const dispatch = useDispatch();

    // State for form visibility
    const [isFormVisible, setIsFormVisible] = useState(false);
    // New state to handle loading status for the submit button
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Local state for form data
    const [formData, setFormData] = useState({
        userId: "",
        packageId: "",
        tests: [],
    });

    // Fetching users, packages, and tests from Redux store
    const { users } = useSelector((state) => state.auth);
    const { packages } = useSelector((state) => state.packages);
    const { tests } = useSelector((state) => state.tests);

    // Fetch data on component mount
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchPackages());
        dispatch(fetchTests());
    }, [dispatch]);

    // Form change handlers
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTestChange = (testId) => {
        const isSelected = formData.tests.includes(testId);
        if (isSelected) {
            setFormData({
                ...formData,
                tests: formData.tests.filter((id) => id !== testId),
            });
        } else {
            setFormData({
                ...formData,
                tests: [...formData.tests, testId],
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Start loading

        try {
            // Await the dispatch to ensure the async action completes
            dispatch(createBooking(formData));
            toast.success("Booking created successfully");
            dispatch(fetchTests())
            
        } catch (error) {
            // Handle any potential errors here
            console.error("Booking creation failed:", error);
        } finally {
            // This block will always run whether the dispatch succeeded or failed
            setIsSubmitting(false); // End loading
        }
        
        // Reset form and hide it after submission
        setFormData({ userId: "", packageId: "", tests: [] });
        setIsFormVisible(false);
    };

    return (
        <div className="p-4 bg-gray-100">
            {/* Create Booking Button */}
            <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-secondary"
            >
                {isFormVisible ? "Close Form" : "Create Booking"}
            </button>

            {/* Conditional Rendering of the Form */}
            {isFormVisible && (
                <div className="flex items-center justify-center bg-gray-100 p-4 mt-6">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-lg p-6 bg-white rounded shadow-lg space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-center text-gray-700">Create Booking</h2>

                        {/* User Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Select User</label>
                            <select
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            >
                                <option value="" disabled>
                                    -- Select User --
                                </option>
                                {users?.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Package Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Select Package</label>
                            <select
                                name="packageId"
                                value={formData.packageId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            >
                                <option value="" disabled>
                                    -- Select Package --
                                </option>
                                {packages?.map((pkg) => (
                                    <option key={pkg._id} value={pkg._id}>
                                        {pkg.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Test Checkboxes */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-600">Select Tests</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tests?.map((test) => (
                                    <label
                                        key={test.id}
                                        className="flex items-center space-x-2"
                                    >
                                        <input
                                            type="checkbox"
                                            value={test.id}
                                            checked={formData.tests.includes(test._id)}
                                            onChange={() => handleTestChange(test._id)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-200"
                                        />
                                        <span className="text-sm text-gray-600">{test.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting} // Disable the button while submitting
                            className={`w-full px-4 py-2 text-white rounded shadow focus:outline-none focus:ring focus:ring-green-200 ${
                                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-secondary"
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </div>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreateBooking;

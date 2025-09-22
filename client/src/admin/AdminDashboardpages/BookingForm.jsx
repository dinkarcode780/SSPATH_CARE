import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/auth/AuthSlice";
import { fetchPackages } from "../../features/package/packageSlice";
import { fetchTests } from "../../features/test/testSlice";
import { createBooking, updateBooking } from "../../features/booking/bookingSlice";

const BookingForm = ({ bookingToEdit, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        userId: "",
        packageId: "",
        tests: [],
    });

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchPackages());
        dispatch(fetchTests());

        if (bookingToEdit) {
            setFormData({
                userId: bookingToEdit.userId?._id || "",
                packageId: bookingToEdit.packageId?._id || "",
                tests: bookingToEdit.tests?.map((test) => test._id) || [],
            });
        }
    }, [dispatch, bookingToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTestChange = (testId) => {
        setFormData((prevData) => ({
            ...prevData,
            tests: prevData.tests.includes(testId)
                ? prevData.tests.filter((id) => id !== testId)
                : [...prevData.tests, testId],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (bookingToEdit) {
            dispatch(updateBooking({ bookingId: bookingToEdit._id, updatedData: formData }));
        } else {
            dispatch(createBooking(formData));
        }

        onClose();
    };

    const { users } = useSelector((state) => state.auth);
    const { packages } = useSelector((state) => state.packages);
    const { tests } = useSelector((state) => state.tests);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 md:w-[50%]">
                <h2 className="text-2xl font-bold text-center">{bookingToEdit ? "Edit Booking" : "Create Booking"}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Select User</label>
                        <select
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="" disabled>-- Select User --</option>
                            {users?.map((user) => (
                                <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Select Package</label>
                        <select
                            name="packageId"
                            value={formData.packageId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="" disabled>-- Select Package --</option>
                            {packages?.map((pkg) => (
                                <option key={pkg._id} value={pkg._id}>{pkg.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium">Select Tests</h3>
                        <div className="flex flex-wrap gap-2">
                            {tests?.map((test) => (
                                <label key={test._id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value={test._id}
                                        checked={formData.tests.includes(test._id)}
                                        onChange={() => handleTestChange(test._id)}
                                        className="border rounded"
                                    />
                                    <span>{test.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full px-4 py-2 bg-primary text-white rounded">
                        {bookingToEdit ? "Update Booking" : "Submit Booking"}
                    </button>
                </form>

                <button onClick={onClose} className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default BookingForm;

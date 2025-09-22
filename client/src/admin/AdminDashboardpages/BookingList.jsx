import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { fetchBookings, deleteBooking, updateBookingStatus } from "../../features/booking/bookingSlice";
import BookingForm from "./BookingForm";
import { toast } from "react-toastify";

const BookingList = () => {
    const dispatch = useDispatch();
    const { bookings, loading, error } = useSelector((state) => state.booking);
    console.log(bookings, "bookings");

    const [selectedTests, setSelectedTests] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showTestModal, setShowTestModal] = useState(false);
    const [showPackageModal, setShowPackageModal] = useState(false);
    const [editingBooking, setEditingBooking] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            dispatch(deleteBooking(id));
            toast.info("Booking deleted successfully");
        }
    };

    const handleViewTests = (tests) => {
        setSelectedTests(tests);
        setShowTestModal(true);
    };

    const handleViewPackage = (packageData) => {
        setSelectedPackage(packageData);
        setShowPackageModal(true);
    };

    const handleEdit = (booking) => {
        setEditingBooking(booking);
        setShowForm(true);
    };

    const handleStatusChange = (bookingId, newStatus) => {
        dispatch(updateBookingStatus({ id: bookingId, status: newStatus }));
        toast.info(`Booking status updated to ${newStatus}`);
    };

    if (loading) return <p className="text-center text-gray-600 py-4">Loading bookings...</p>;
    if (error) return <p className="text-center text-red-600 py-4">Error: {error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Bookings</h2>
            {bookings.length === 0 ? (
                <p className="text-center text-gray-600">No bookings found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="border p-2">Customer</th>
                                <th className="border p-2">Mobile</th>
                                <th className="border p-2">Package/Test</th>
                                <th className="border p-2">Package Detail</th>
                                <th className="border p-2">Tests</th>
                                <th className="border p-2">Total Price</th>
                                <th className="border p-2">Booking Date</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="text-center border">
                                    <td className="border p-2">{booking.userId?.firstName} {booking.userId?.lastName}</td>
                                    <td className="border p-2">{booking.userId?.mobileNumber}</td>
                                    <td className="border p-2">{booking.packageId?.name || booking.tests?.map((test) => test?.testId?.name).join(", ") || "Package not present"} </td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handleViewPackage(booking.packageId)}
                                            className="ml-2 bg-primary text-white px-3 py-1 rounded hover:bg-secondary"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handleViewTests(booking.tests)}
                                            className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="border p-2">₹{booking.totalPrice.toFixed(0)}.00</td>
                                    <td className="border p-2">{new Date(booking.bookingDate).toLocaleString()}</td>
                                    <td className="border p-2">
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                            className="bg-gray-200 p-1 rounded"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Confirmed</option>
                                            <option value="rejected">Cancelled</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                    <td className="border p-2 flex justify-center gap-2">
                                        <button onClick={() => handleEdit(booking)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(booking._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                            <FaTrash />
                                        </button>
                                        {showForm && <BookingForm bookingToEdit={editingBooking} onClose={() => setShowForm(false)} />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Test Details Modal */}
            {showTestModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96 md:w-[50%]">
                        <h3 className="text-lg font-semibold mb-4">Test Details</h3>
                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Test Name</th>
                                    <th className="border p-2">Description</th>
                                    <th className="border p-2">Test Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedTests.map((test) => (
                                    <tr key={test._id}>
                                        <td className="border p-2">{test?.testId?.name || "name is not present"}</td>
                                        <td className="border p-2">{test?.testId?.description || "description is not present"}</td>
                                        <td className="border p-2">₹{test?.testId?.finalPrice || "price is not present"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={() => setShowTestModal(false)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Package Details Modal */}
            {showPackageModal && selectedPackage && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96 md:w-[50%]">
                        <h3 className="text-lg font-semibold mb-4">Package Details</h3>
                        <table className="w-full border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="border p-2 font-semibold">Name</td>
                                    <td className="border p-2">{selectedPackage.name}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold">Description</td>
                                    <td className="border p-2">{selectedPackage.description}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold">Price</td>
                                    <td className="border p-2">₹{selectedPackage.price}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold">Discount</td>
                                    <td className="border p-2">{selectedPackage.discountPercent}%</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold">Final Price</td>
                                    <td className="border p-2">₹{selectedPackage.finalPrice}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 font-semibold">Parameters</td>
                                    <td className="border p-2">{selectedPackage.parameters}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={() => setShowPackageModal(false)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingList;
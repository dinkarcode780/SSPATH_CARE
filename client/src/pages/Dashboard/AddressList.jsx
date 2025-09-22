import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses, deleteAddress, updateAddress } from '../../features/address/addressSlice';

const AddressList = ({ userId }) => {
    const dispatch = useDispatch();
    const { addresses, loading, error } = useSelector((state) => state.address);

    const [isEditing, setIsEditing] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [formData, setFormData] = useState({});
    // console.log(currentAddress, "currentAddress");
    

    useEffect(() => {
        dispatch(fetchAddresses(userId));
    }, [dispatch, userId]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            dispatch(deleteAddress(id));
        }
    };

    const handleEditClick = (address) => {
        setIsEditing(true);
        setCurrentAddress(address);
        setFormData({ ...address });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = () => {
        dispatch(updateAddress({ id: currentAddress._id, ...formData }));
        setIsEditing(false);
        setCurrentAddress(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentAddress(null);
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Address List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {addresses.map((address) => (
                    <div key={address._id} className="border bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                        <p><strong>Name:</strong> {address.name}</p>
                        <p><strong>Phone:</strong> {address.number}</p>
                        <p><strong>Locality:</strong> {address.locality}</p>
                        <p><strong>Address:</strong> {address.address}</p>
                        <p><strong>City:</strong> {address.city}</p>
                        <p><strong>Pincode:</strong> {address.pincode}</p>
                        <p><strong>Landmark:</strong> {address.landmark}</p>
                        <p><strong>Type:</strong> {address.addressType}</p>
                        <p><strong>Created At:</strong> {new Date(address.createdAt).toLocaleDateString()}</p>
                        <p><strong>Updated At:</strong> {new Date(address.updatedAt).toLocaleDateString()}</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => handleEditClick(address)}
                                className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(address._id)}
                                className="px-4 py-2 border border-primary text-primary rounded hover:bg-red-600 hover:text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Address</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleFormChange}
                                placeholder="Name"
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="number"
                                value={formData.number || ''}
                                onChange={handleFormChange}
                                placeholder="Phone Number"
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="locality"
                                value={formData.locality || ''}
                                onChange={handleFormChange}
                                placeholder="Locality"
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="address"
                                value={formData.address || ''}
                                onChange={handleFormChange}
                                placeholder="Address"
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="city"
                                value={formData.city || ''}
                                onChange={handleFormChange}
                                placeholder="City"
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode || ''}
                                onChange={handleFormChange}
                                placeholder="Pincode"
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark || ''}
                                onChange={handleFormChange}
                                placeholder="Landmark"
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressList;

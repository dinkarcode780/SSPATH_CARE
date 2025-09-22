import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers,deleteUserAction } from '../../features/auth/AuthSlice';
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.mobileNumber.includes(search)
  );

  // for live code
//   const filteredUsers = users.filter((user) => {
//   const firstName = user.firstName ? user.firstName.toLowerCase() : "";
//   const lastName = user.lastName ? user.lastName.toLowerCase() : "";
//   const email = user.email ? user.email.toLowerCase() : "";
//   const mobileNumber = user.mobileNumber ? user.mobileNumber : "";

//   return (
//     firstName.includes(search.toLowerCase()) ||
//     lastName.includes(search.toLowerCase()) ||
//     email.includes(search.toLowerCase()) ||
//     mobileNumber.includes(search)
//   );
// });



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDeleteUser = (userId) => {
  
    dispatch(deleteUserAction(userId)); 
    toast.info("User deleted successfully");
    dispatch(fetchUsers());
  };

  return (
    <div className="">
      <div className="bg-white p-4 card-body-main  rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Users Management</h2>

        {/* Search and Entries */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or number"
            className="mb-4 md:mb-0 p-2 border border-gray-300 rounded w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="entries" className="text-gray-600">Show:</label>
            <select
              id="entries"
              className="p-2 border border-gray-300 rounded"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Error and Loading */}
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-primary text-white">
                {/* <th className="px-4 py-2 text-left">ID</th> */}
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Number</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-100">
                  {/* <td className="px-4 py-2">{user._id}</td> */}
                  <td className="px-4 py-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.mobileNumber}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrescriptions } from "../../features/adminPrescription/adminPrescriptionSlice";
import { toast } from "react-toastify";

const AdminPrescriptionPage = () => {
  const dispatch = useDispatch();
  const { prescriptions, loading, error } = useSelector(
    (state) => state.adminPrescriptions
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchPrescriptions());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const safePrescriptions = Array.isArray(prescriptions) ? prescriptions : [];

  // Search and filter logic
  const filteredPrescriptions = safePrescriptions.filter((prescription) =>
    Object.values(prescription)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPrescriptions = filteredPrescriptions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPrescriptions.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const baseURL = "https://soft.sspathcare.com/api/v1/uploads/";

  return (
    <div className="min-h-screen  px-4 py-6 card-body-main">
      <div className="max-w-7xl mx-auto">
        <h1 id="main-headings" className="text-4xl font-bold text-gray-800 mb-6 text-center">
          All <span className="heading-span">Prescriptions</span>
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name, city, or email..."
            className="w-1/3 sm:w-full px-6 py-3 border-2 border-blue-500 rounded-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Pagination Info */}
          <p className="text-gray-600 text-lg">
            Page {currentPage} of {totalPages || 1}
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading prescriptions...</p>
        ) : currentPrescriptions.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No prescriptions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Name</th>
                  <th className="border border-gray-200 px-4 py-2">City</th>
                  <th className="border border-gray-200 px-4 py-2">Email</th>
                  <th className="border border-gray-200 px-4 py-2">Mobile</th>
                  <th className="border border-gray-200 px-4 py-2">Message</th>
                  <th className="border border-gray-200 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPrescriptions.map((prescription) => (
                  <tr key={prescription._id} className="text-center hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-200 px-4 py-2">{prescription.name}</td>
                    <td className="border border-gray-200 px-4 py-2">{prescription.city}</td>
                    <td className="border border-gray-200 px-4 py-2">{prescription.email}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      {prescription.phone || "N/A"}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {prescription.message || "N/A"}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <a
                        href={`${prescription.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary text-white text-center py-2 px-2 rounded-md shadow-lg hover:bg-secondary transition-colors"
                      >
                        <p className="text-white font-bold">View Prescription</p>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-6 flex items-center justify-center gap-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-6 py-3 rounded-lg shadow-xl transition-colors duration-300 ${currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105"
              }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-6 py-3 rounded-lg shadow-xl transition-colors duration-300 ${currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary text-white hover:bg-secondary transform hover:scale-105"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPrescriptionPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeCollection } from '../../features/homecollection/homecollectionSlice';

const HomeCollection = () => {
  const dispatch = useDispatch();
  const { homeCollections, isLoading, error } = useSelector((state) => state.homeCollection);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchHomeCollection());
  }, [dispatch, homeCollections]);

  // Filter collections based on the search input
  const filteredCollections = homeCollections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(search.toLowerCase()) ||
      collection.city.toLowerCase().includes(search.toLowerCase()) ||
      collection.mobileNumber.includes(search)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCollections = filteredCollections.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4 card-body-main">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Home Collection Table</h2>
      <input
        type="text"
        placeholder="Search by name, city, or number"
        className="mb-4 p-2 border border-gray-300 rounded w-full sm:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading && <p>See your collections...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Number</th>
              <th className="px-4 py-2 text-left">City</th>
            </tr>
          </thead>
          <tbody>
            {currentCollections.map((collection) => (
              <tr key={collection.id} className="border-t">
                <td className="px-4 py-2">{collection.name}</td>
                <td className="px-4 py-2">{collection.mobileNumber}</td>
                <td className="px-4 py-2">{collection.city}</td>
              </tr>
            ))}
            {currentCollections.length === 0 && (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                  No collections found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
  );
};

export default HomeCollection;

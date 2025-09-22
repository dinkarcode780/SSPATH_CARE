import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../features/contact/contactFormSlice';

const Contact = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contactForm);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(10);  // Set initial page size

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phoneNumber.includes(searchQuery) ||
      contact.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change entries per page
  const handleEntriesChange = (e) => {
    setContactsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing entries per page
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className='card-body-main pb-4'>
      <h2 id='main-headings' className="font-semibold text-gray-800 mb-4">
        Contact <span className="heading-span">Inquiries</span>
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Search Bar and Entries Per Page Dropdown */}
      <div className="flex justify-between items-center mb-4">
        {/* Search bar on the right */}
        <input
          type="text"
          placeholder="Search Contacts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 w-1/4"
        />

        {/* Show Entries Dropdown on the left */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Show</span>
          <select
            value={contactsPerPage}
            onChange={handleEntriesChange}
            className="p-2 rounded-lg border border-gray-300 text-gray-700"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-gray-700"></span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse bg-white">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Number</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">City</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Message</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((contact) => (
              <tr key={contact.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.name}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.email}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.phoneNumber}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.city}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-700">
          <span className="mr-2">Showing {indexOfFirstContact + 1} to {Math.min(indexOfLastContact, filteredContacts.length)} of {filteredContacts.length} entries</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Pagination Controls */}
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: Math.ceil(filteredContacts.length / contactsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                } hover:bg-blue-300`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(currentPage < Math.ceil(filteredContacts.length / contactsPerPage) ? currentPage + 1 : currentPage)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            disabled={currentPage === Math.ceil(filteredContacts.length / contactsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

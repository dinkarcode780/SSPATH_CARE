
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests, createTest, updateTest, deleteTest } from "../../features/test/testSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
const sampleTypes = ["Blood", "Urine", "Stool", "Feces", "Oral Fluid", "Other"];
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toast } from "react-toastify";

const TestPage = () => {
  const dispatch = useDispatch();
  const { tests, loading, error } = useSelector((state) => state?.tests || {});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTest, setCurrentTest] = useState({
    name: "",
    description: "",
    price: "",
    discountPercent: "",
    sampleType: "Blood",
    parameter: [],
    duration: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  // Ensure tests is an array before filtering
  const testsArray = Array.isArray(tests) ? tests : [];
  const filteredTests = testsArray.filter((test) =>
    test?.name?.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  const indexOfLastTest = currentPage * entriesPerPage;
  const indexOfFirstTest = indexOfLastTest - entriesPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(filteredTests.length / entriesPerPage);

  const handleOpenModal = (test = null) => {
    if (test) {
      setCurrentTest({
        ...test,
        parameter: Array.isArray(test.parameter) ? test.parameter : []
      });
      setIsEditing(true);
    } else {
      setCurrentTest({
        name: "",
        description: "",
        price: "",
        discountPercent: "",
        sampleType: "Blood",
        parameter: [],
        duration: "",
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTest({
      name: "",
      description: "",
      price: "",
      discountPercent: "",
      sampleType: "Blood",
      parameter: [],
      duration: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTest({ ...currentTest, [name]: value });
  };

  const handleParameterChange = (e) => {
    const value = e.target.value;
    const parametersArray = value.split(",").map((param) => param.trim()).filter(param => param !== "");
    setCurrentTest({
      ...currentTest,
      parameter: parametersArray,
    });
  };

  const handleSave = () => {
    // Validate required fields
    if (!currentTest.name || !currentTest.description || !currentTest.price || !currentTest.duration) {
      toast.info("Please fill in all required fields");
      return;
    }

    // Prepare data for submission
    const testData = {
      ...currentTest,
      price: parseFloat(currentTest.price) || 0,
      discountPercent: parseFloat(currentTest.discountPercent) || 0,
      parameter: Array.isArray(currentTest.parameter) ? currentTest.parameter : []
    };

    if (isEditing) {
      dispatch(updateTest({ id: currentTest._id, updatedData: testData }));
      toast.success("Test updated successfully!");
    } else {
      dispatch(createTest(testData));
      toast.success("Test created successfully!");

    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      dispatch(deleteTest(id));
      toast.info("Test deleted successfully!");
    }
  };

  return (
    <div className="container mx-auto py-10 card-body-main min-h-screen bg-gray-100">
      <div className="md:flex justify-between items-center mb-5">
        <div className="flex items-center gap-1 mb-5 md:w-1/2 md:justify-between">
          <h1 className="text-md md:text-3xl font-bold">Tests</h1>
          <input
            type="text"
            placeholder="Search by test name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <button
            className="bg-primary text-white px-4 py-1 rounded hover:bg-secondary"
            onClick={() => handleOpenModal()}
          >
            Add New Test
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border border-gray-200 px-4 py-2">Test Name</th>
              <th className="border border-gray-200 px-4 py-2">Description</th>
              <th className="border border-gray-200 px-4 py-2">Price</th>
              <th className="border border-gray-200 px-4 py-2">Discount (%)</th>
              <th className="border border-gray-200 px-4 py-2">Final Price</th>
              <th className="border border-gray-200 px-4 py-2">Sample Type</th>
              <th className="border border-gray-200 px-4 py-2">Duration</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTests.length > 0 ? (
              currentTests.map((test) => (
                <tr key={test._id} className="text-center hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{test.name}</td>
                  <td className="border border-gray-200 px-4 py-2 max-w-xs truncate">
                    {test.description}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">₹{test.price}</td>
                  <td className="border border-gray-200 px-4 py-2">{test.discountPercent}%</td>
                  <td className="border border-gray-200 px-4 py-2">
                    ₹{(test.price - (test.price * (test.discountPercent / 100))).toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{test.sampleType}</td>
                  <td className="border border-gray-200 px-4 py-2">{test.duration}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
                        onClick={() => handleOpenModal(test)}
                        data-tooltip-id="edit-tooltip"
                        data-tooltip-content="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                        onClick={() => handleDelete(test._id)}
                        data-tooltip-id="delete-tooltip"
                        data-tooltip-content="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                  No tests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:flex justify-between items-center mt-5">
        <div>
          Showing {Math.min(indexOfFirstTest + 1, filteredTests.length)} to{" "}
          {Math.min(indexOfLastTest, filteredTests.length)} of {filteredTests.length} entries
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
          >
            Previous
          </button>
          <span className="px-3 py-1 bg-gray-200 rounded">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <Tooltip id="edit-tooltip" />
      <Tooltip id="delete-tooltip" />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full h-auto max-w-3xl p-8 rounded-lg shadow-xl mt-12 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{isEditing ? "Edit Test" : "Add New Test"}</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-medium mb-1 text-sm">
                  Test Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentTest.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter test name"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={currentTest.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter test description"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={currentTest.price}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-sm">Discount (%)</label>
                  <input
                    type="number"
                    name="discountPercent"
                    value={currentTest.discountPercent}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Sample Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sampleType"
                    value={currentTest.sampleType}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {sampleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1 text-sm">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={currentTest.duration}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 1-2 hours, 24 hours"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm">
                  Parameters (comma-separated) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={Array.isArray(currentTest.parameter) ? currentTest.parameter.join(", ") : ""}
                  onChange={handleParameterChange}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Hemoglobin, RBC Count, WBC Count"
                />
                <small className="text-gray-500">
                  Enter parameters separated by commas
                </small>
              </div>

              {/* Preview final price */}
              {currentTest.price && (
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm">
                    <strong>Final Price Preview:</strong> ₹
                    {(
                      parseFloat(currentTest.price || 0) -
                      (parseFloat(currentTest.price || 0) *
                        (parseFloat(currentTest.discountPercent || 0) / 100))
                    ).toFixed(2)}
                  </p>
                </div>
              )}
            </form>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition-colors"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={handleSave}
              >
                {isEditing ? "Update Test" : "Save Test"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportsByPrescription } from '../features/report/prescriptionReportSlice';
import { FiDownload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ReportDownload = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchCompleted, setSearchCompleted] = useState(false);
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { reports, loading, error } = useSelector((state) => state.prescriptionReports);

    // Handle Search
    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            await dispatch(fetchReportsByPrescription(searchInput));
            setSearchCompleted(true);
        } else {
            setSearchCompleted(false);
        }
        setSearchInput('');
    };

    // Handle Report Download
    const handleDownload = async (reportFile) => {
        try {
            const response = await fetch(reportFile);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "report.jpg");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };

    // Handle Payment
    const handlePayment = (reportId) => {
        navigate(`/payment/${reportId}`);
    };

    // Filter Reports
    const filteredReports = reports.filter((report) => {
        const reportDate = new Date(report.createdAt).toISOString().split('T')[0];
        const matchesDate = filterDate ? reportDate === filterDate : true;
        const matchesStatus = filterStatus === 'all' ? true : report.status === filterStatus;
        return matchesDate && matchesStatus;
    });

    useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

    return (
        <div className="min-h-fit flex flex-col items-center justify-center md:pt-20 pb-10 bg-gray-50 px-4">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Download Your Report</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Enter your PrescriptionId to search and download your medical report.
                </p>
                <form onSubmit={handleSearch} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Mobile number to get report"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search Report'}
                    </button>
                </form>
                {searchCompleted && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Search Results</h2>
                        
                        {/* Filter Inputs */}
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">completed</option>
                            </select>
                        </div>

                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        {filteredReports.length > 0 ? (
                            <ul className="space-y-3">
                                {filteredReports.map((report) => (
                                    <li
                                        key={report._id}
                                        className="flex flex-col gap-2 bg-gray-100 p-3 rounded-md shadow"
                                    >
                                        <p className="font-medium text-gray-800">📄 {report.reportType}</p>
                                        <p className="text-sm text-gray-600">👨‍⚕️ Doctor: {report.doctorName}</p>
                                        <p className="text-sm text-gray-600">📞 Mobile: {report.userMobile}</p>
                                        <p className="text-sm text-gray-600">💬 Comments: {report.comments}</p>
                                        <p className="text-sm text-gray-600">📅 Date: {new Date(report.createdAt).toLocaleString()}</p>
                                        <p className={`text-sm font-semibold ${report.status === "Pending" ? "text-gray-600" : "text-green-600"
                                            }`}>📌 Status: {report.status}</p>

                                        {report.status === "Pending" ? (
                                            <button
                                                onClick={() => handlePayment(report._id)}
                                                className="mt-2 w-fit flex items-center gap-2 bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 focus:outline-none"
                                            >
                                                💳 Pay Now
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleDownload(report.reportFile)}
                                                className="mt-2 w-fit flex items-center gap-2 bg-primary text-white py-1 px-3 rounded-md hover:bg-secondary focus:outline-none"
                                            >
                                                <FiDownload /> Download
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No reports found for the given filters.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportDownload;
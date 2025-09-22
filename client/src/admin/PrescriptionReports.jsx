// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import {
//     fetchReports,
//     createReport,
//     deleteReport,
//     updateReport,
//     updateReportStatus
// } from '../features/report/prescriptionReportSlice';

// import { fetchUsers } from "../features/auth/AuthSlice";



// const PrescriptionReports = () => {
//     const dispatch = useDispatch();
//     const { reports, loading, error } = useSelector((state) => state.prescriptionReports);
//     console.log(reports);


//     const [formData, setFormData] = useState({
//         userId: '',
//         reportType: '',
//         doctorName: '',
//         file: null,
//         comments: '',
//     });
//     const [editingId, setEditingId] = useState(null);

//     const { users } = useSelector((state) => state.auth);


//     useEffect(() => {
//         dispatch(fetchReports());
//         dispatch(fetchUsers());
//     }, [dispatch]);




//     const handleInputChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData({
//             ...formData,
//             [name]: files ? files[0] : value,
//         });
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//             data.append(key, value);
//         });
    
//         if (editingId) {
//             dispatch(updateReport({ id: editingId, data }));
//             setEditingId(null);
//             toast.info("Report updated successfully");
//         } else {
//          dispatch(createReport(data));
//          toast.success('Report created successfully');
//         }

//         dispatch(fetchReports());
    
//         setFormData({ userId: '', reportType: '', doctorName: '', file: null, comments: '' });
//     };
    
//     const handleEdit = (report) => {
//         setEditingId(report._id);
//         setFormData({
//             userId: report.userId,
//             reportType: report.reportType,
//             doctorName: report.doctorName,
//             file: null, 
//             comments: report.comments,
//         });
//     };

//     const handleDelete = async (id) => {
//          dispatch(deleteReport(id));
//          toast.info("Report deleted successfully");
//         dispatch(fetchReports()); 
//     };
    

//     const handleStatusChange = async (reportId, newStatus) => {
//         console.log(reportId,newStatus);
        
//          dispatch(updateReportStatus({ id: reportId, status: newStatus }));
//          toast.success("Report status updated successfully");
//         dispatch(fetchReports()); 

//     };

//     return (
//         <div className="container mx-auto p-4 card-body-main">
//             <h1 className="text-2xl font-bold mb-4">Prescription Reports</h1>

//             <form className="mb-6" onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-600">Select User</label>
//                         <select
//                             name="userId"
//                             value={formData.userId}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//                             required
//                         >
//                             <option value="" disabled>
//                                 -- Select User --
//                             </option>
//                             {users?.map((user) => (
//                                 <option key={user._id} value={user._id}>
//                                     {user.firstName} {user.lastName}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="">
//                         <label className="block text-sm font-medium text-gray-600">Report Type</label>
//                         <select
//                             type="text"
//                             name="reportType"
//                             placeholder="Report Type"
//                             value={formData.reportType}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2  mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//                             required
//                         >
//                             <option value="" disabled>
//                                 -- Select Report Type --
//                             </option>
//                             <option value="Blood Test">Blood Test</option>
//                             <option value="X-Ray">X-Ray</option>
//                             <option value="MRI">MRI</option>
//                             <option value="CT Scan">CT Scan</option>
//                             <option value="Ultrasound">Ultrasound</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>
//                     <div className="">
//                         <label className="block text-sm font-medium text-gray-600">Doctor Name</label>
//                         <input
//                             type="text"
//                             name="doctorName"
//                             placeholder="Doctor Name"
//                             value={formData.doctorName}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2  mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//                             required
//                         />
//                     </div>
//                     <div className="">
//                         <label className="block text-sm font-medium text-gray-600">File</label>
//                         <input
//                             type="file"
//                             name="file"
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2  mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//                             required={!editingId}
//                         />
//                     </div>
//                     <div className="">
//                         <label className="block text-sm font-medium text-gray-600">Comments</label>
//                         <textarea
//                             name="comments"
//                             placeholder="Comments"
//                             value={formData.comments}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2  mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//                         />
//                     </div>
//                 </div>
//                 <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
//                     {editingId ? 'Update' : 'Create'}
//                 </button>
//             </form>

//             {loading && <p>Loading...</p>}
//             {error && <p className="text-red-500">{error}</p>}
//             <div className="overflow-x-auto">
//                 <table className="table-auto w-full border border-gray-300">
//                     <thead>
//                         <tr className="bg-primary text-white">
//                             <th className="px-4 py-2">Name</th>
//                             <th className="px-4 py-2">Mobile No</th>
//                             <th className="px-4 py-2">Report Type</th>
//                             <th className="px-4 py-2">Doctor Name</th>
//                             <th className="px-4 py-2">File</th>
//                             <th className="px-4 py-2">Payment Status</th>
//                             <th className="px-4 py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {reports.map((report) => (
//                             <tr key={report._id}>
//                                 <td className="px-4 py-2">
//                                     {report.userId?.firstName + " " + report.userId?.lastName || "No Name Available"}
//                                 </td>
//                                 <td className="px-4 py-2">{report.userId?.mobileNumber}</td>
//                                 <td className="px-4 py-2">{report.reportType}</td>
//                                 <td className="px-4 py-2">{report.doctorName}</td>
//                                 <td>
//                                     {typeof report.reportFile === 'string' ? (
//                                         <a
//                                             href={`${report.reportFile}`}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             View File
//                                         </a>
//                                     ) : (
//                                         'No file available'
//                                     )}
//                                 </td>
//                                 <td className="border p-2">
//                                         <select
//                                             value={report.status}
//                                             onChange={(e) => handleStatusChange(report._id, e.target.value)}
//                                             className="bg-gray-200 p-1 rounded"
//                                         >
//                                             <option value="pending">Pending</option>
//                                             <option value="completed">Completed</option>
//                                         </select>
//                                     </td>

//                                 <td className="px-4 py-2 space-x-2">
//                                     <button
//                                         onClick={() => handleEdit(report)}
//                                         className="px-2 py-1 bg-yellow-500 text-white rounded"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(report._id)}
//                                         className="px-2 py-1 bg-red-500 text-white rounded"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// };

// export default PrescriptionReports;





import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    fetchReports,
    createReport,
    deleteReport,
    updateReport,
    updateReportStatus
} from '../features/report/prescriptionReportSlice';

import { fetchUsers } from "../features/auth/AuthSlice";


const PrescriptionReports = () => {
    const dispatch = useDispatch();
    const { reports, loading, error } = useSelector((state) => state.prescriptionReports);
    console.log(reports);

    const [formData, setFormData] = useState({
        userId: '',
        reportType: '',
        doctorName: '',
        file: null,
        comments: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to handle loading status for form submission

    const { users } = useSelector((state) => state.auth);


    useEffect(() => {
        dispatch(fetchReports());
        dispatch(fetchUsers());
    }, [dispatch]);


    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
    
        try {
            if (editingId) {
                await dispatch(updateReport({ id: editingId, data }));
                setEditingId(null);
                toast.info("Report updated successfully");
            } else {
                await dispatch(createReport(data));
                toast.success('Report created successfully');
            }
        } catch (error) {
            console.error("Failed to submit report:", error);
            toast.error("Failed to submit report.");
        } finally {
            setIsLoading(false); // Stop loading
        }

        await dispatch(fetchReports());
        setFormData({ userId: '', reportType: '', doctorName: '', file: null, comments: '' });
    };
    
    const handleEdit = (report) => {
        setEditingId(report._id);
        setFormData({
            userId: report.userId,
            reportType: report.reportType,
            doctorName: report.doctorName,
            file: null, 
            comments: report.comments,
        });
    };

    const handleDelete = async (id) => {
        await dispatch(deleteReport(id));
        toast.info("Report deleted successfully");
        dispatch(fetchReports()); 
    };
    

    const handleStatusChange = async (reportId, newStatus) => {
        console.log(reportId,newStatus);
        
        await dispatch(updateReportStatus({ id: reportId, status: newStatus }));
        toast.success("Report status updated successfully");
        dispatch(fetchReports()); 

    };

    return (
        <div className="container mx-auto p-4 card-body-main">
            <h1 className="text-2xl font-bold mb-4">Prescription Reports</h1>

            <form className="mb-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Select User</label>
                        <select
                            name="userId"
                            value={formData.userId}
                            onChange={handleInputChange}
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
                    <div className="">
                        <label className="block text-sm font-medium text-gray-600">Report Type</label>
                        <select
                            type="text"
                            name="reportType"
                            placeholder="Report Type"
                            value={formData.reportType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="" disabled>
                                -- Select Report Type --
                            </option>
                            <option value="Blood Test">Blood Test</option>
                            <option value="X-Ray">X-Ray</option>
                            <option value="MRI">MRI</option>
                            <option value="CT Scan">CT Scan</option>
                            <option value="Ultrasound">Ultrasound</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-600">Doctor Name</label>
                        <input
                            type="text"
                            name="doctorName"
                            placeholder="Doctor Name"
                            value={formData.doctorName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-600">File</label>
                        <input
                            type="file"
                            name="file"
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            required={!editingId}
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-600">Comments</label>
                        <textarea
                            name="comments"
                            placeholder="Comments"
                            value={formData.comments}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    disabled={isLoading} // Disable the button while loading
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            {editingId ? 'Updating...' : 'Creating...'}
                        </div>
                    ) : (
                        editingId ? 'Update' : 'Create'
                    )}
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Mobile No</th>
                            <th className="px-4 py-2">Report Type</th>
                            <th className="px-4 py-2">Doctor Name</th>
                            <th className="px-4 py-2">File</th>
                            <th className="px-4 py-2">Payment Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id}>
                                <td className="px-4 py-2">
                                    {report.userId?.firstName + " " + report.userId?.lastName || "No Name Available"}
                                </td>
                                <td className="px-4 py-2">{report.userId?.mobileNumber}</td>
                                <td className="px-4 py-2">{report.reportType}</td>
                                <td className="px-4 py-2">{report.doctorName}</td>
                                <td>
                                    {typeof report.reportFile === 'string' ? (
                                        <a
                                            href={`${report.reportFile}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View File
                                        </a>
                                    ) : (
                                        'No file available'
                                    )}
                                </td>
                                <td className="border p-2">
                                    <select
                                        value={report.status}
                                        onChange={(e) => handleStatusChange(report._id, e.target.value)}
                                        className="bg-gray-200 p-1 rounded"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </td>

                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(report)}
                                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(report._id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PrescriptionReports;

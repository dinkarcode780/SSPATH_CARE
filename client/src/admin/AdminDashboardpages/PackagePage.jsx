// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     fetchPackages,
//     createPackage,
//     updatePackage,
//     deletePackage,
// } from "../../features/package/packageSlice";
// import { fetchTests } from "../../features/test/testSlice";
// import { MdDeleteOutline } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { toast } from "react-toastify";
// const PackagePage = () => {
//     const dispatch = useDispatch();

//     const { packages } = useSelector((state) => state.packages);
//     const { tests } = useSelector((state) => state.tests);

//     const [showModal, setShowModal] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedPackage, setSelectedPackage] = useState(null);
//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         tests: [],
//         price: 0,
//         discountPercent: 0,
//         parameters: 0,
//     });

//     useEffect(() => {
//         dispatch(fetchPackages());
//         dispatch(fetchTests());
//     }, [dispatch]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleTestChange = (testId) => {
//         setFormData((prev) => ({
//             ...prev,
//             tests: prev.tests.includes(testId)
//                 ? prev.tests.filter((id) => id !== testId)
//                 : [...prev.tests, testId],
//         }));
//     };

//     const handleSubmit = () => {
//         if (!formData.price || isNaN(formData.price)) {
//             alert("Please enter a valid price");
//             return;
//         }

//         if (!formData.discountPercent || isNaN(formData.discountPercent)) {
//             alert("Please enter a valid discount percent");
//             return;
//         }
//         if (editMode) {
//             console.log(selectedPackage, "selectedPackage");
//             console.log(formData, "formData");

//             dispatch(updatePackage({ id: selectedPackage._id, updatedData: formData }));
//              toast.success("Package Edited Successfully !");
//         } else {
//             dispatch(createPackage(formData));
//              toast.success("Package Added Successfully !");
//         }
//         setShowModal(false);
//         setEditMode(false);
//         resetForm();
       
//     };

//     const handleEdit = (pkg) => {
//         setEditMode(true);
//         setSelectedPackage(pkg);
//         setFormData({
//             name: pkg.name,
//             description: pkg.description,
//             tests: pkg.tests.map((test) => test._id),
//             price: pkg.price,
//             discountPercent: pkg.discountPercent,
//             parameters: pkg.parameters,
//         });
//         setShowModal(true);
   
//     };

//     const handleDelete = (id) => {
//         dispatch(deletePackage(id));
//         toast.info("Package Deleted successfully...");
//     };

//     const resetForm = () => {
//         setFormData({
//             name: "",
//             description: "",
//             tests: [],
//             price: 0,
//             discountPercent: 0,
//             parameters: 0,
//         });
//     };

//     return (
//         <div className="p-6 card-body-main">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold">Manage Packages</h1>
//                 <button
//                     className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
//                     onClick={() => {
//                         resetForm();
//                         setShowModal(true);
//                     }}
//                 >
//                     Add Package
//                 </button>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-primary text-white">
//                             <th className="border border-gray-300 text-white px-4 py-2">Name</th>
//                             <th className="border border-gray-300 text-white px-4 py-2">Description</th>
//                             <th className="border border-gray-300 text-white px-4 py-2">Price</th>
//                             <th className="border border-gray-300 text-white px-4 py-2">Discount (%)</th>
//                             <th className="border border-gray-300 text-white px-4 py-2">Final Price</th>
//                             <th className="border border-gray-300 text-white px-4 py-2">Parameters</th>
//                             <th className="border border-gray-300 text-white px-4 py-2">Tests</th>
//                             <th className="border border-gray-300 text-white px-4 py-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {packages.map((pkg) => (
//                             <tr key={pkg._id} className="text-center">
//                                 <td className="border border-gray-300 px-4 py-2">{pkg.name}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{pkg.description}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{pkg.price}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{pkg.discountPercent}</td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {(pkg.price - (pkg.price * pkg.discountPercent) / 100).toFixed(2)}
//                                 </td>
//                                 <td className="border border-gray-300 px-4 py-2">{pkg.parameters}</td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {pkg.tests.map((test) => test.name).join(", ")}
//                                 </td>
//                                 <td className="border border-gray-300 px-4 py-2 md:flex  justify-between items-center ">
//                                     <button
//                                         className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
//                                         onClick={() => handleEdit(pkg)}
//                                     >
//                                         <FaRegEdit />
//                                     </button>
//                                     <button
//                                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                         onClick={() => handleDelete(pkg._id)}
//                                     >
//                                         <MdDeleteOutline />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {showModal && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-50 pt-16 flex items-center justify-center z-50">
//                     <div className="bg-white w-full max-w-xl sm:w-1/2 h-4/5 rounded-lg shadow-lg overflow-auto p-6 relative">
//                         <div className="absolute top-0 right-0 mt-4 mr-4">
//                             <button
//                                 className="text-gray-600 hover:text-gray-800"
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-6 w-6"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                         <h2 className="text-2xl font-bold mb-4">
//                             {editMode ? "Edit Package" : "Add Package"}
//                         </h2>
//                         <form className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">Package Name</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleInputChange}
//                                     className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00836C]"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">Description</label>
//                                 <textarea
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleInputChange}
//                                     className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00836C]"
//                                     rows={3}
//                                 ></textarea>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Price</label>
//                                     <input
//                                         type="number"
//                                         name="price"
//                                         value={formData.price}
//                                         onChange={handleInputChange}
//                                         className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00836C]"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Discount (%)</label>
//                                     <input
//                                         type="number"
//                                         name="discountPercent"
//                                         value={formData.discountPercent}
//                                         onChange={handleInputChange}
//                                         className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00836C]"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Parameters</label>
//                                     <input
//                                         type="number"
//                                         name="parameters"
//                                         value={formData.parameters}
//                                         onChange={handleInputChange}
//                                         className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00836C]"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium mb-1">Select Tests</label>
//                                 <div className="space-y-2">
//                                     {tests.map((test) => (
//                                         <label key={test._id} className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={formData.tests.includes(test._id)}
//                                                 onChange={() => handleTestChange(test._id)}
//                                                 className="mr-2"
//                                             />
//                                             <span>{test.name}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>
//                         </form>
//                         <div className="flex justify-end mt-6">
//                             <button
//                                 className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-2"
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                                 onClick={handleSubmit}
//                             >
//                                 {editMode ? "Update" : "Create"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default PackagePage;






import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPackages,
    createPackage,
    updatePackage,
    deletePackage,
} from "../../features/package/packageSlice";
import { fetchTests } from "../../features/test/testSlice";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
const PackagePage = () => {
    const dispatch = useDispatch();

    const { packages } = useSelector((state) => state.packages);
    const { tests } = useSelector((state) => state.tests);

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        tests: [],
        price: 0,
        discountPercent: 0,
        parameters: 0,
    });

    useEffect(() => {
        dispatch(fetchPackages());
        dispatch(fetchTests());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTestChange = (testId) => {
        setFormData((prev) => ({
            ...prev,
            tests: prev.tests.includes(testId)
                ? prev.tests.filter((id) => id !== testId)
                : [...prev.tests, testId],
        }));
    };

    const handleSubmit = async () => {
        if (!formData.price || isNaN(formData.price)) {
            // Using a toast for a non-breaking UI experience
            toast.error("Please enter a valid price");
            return;
        }

        if (!formData.discountPercent || isNaN(formData.discountPercent)) {
            toast.error("Please enter a valid discount percent");
            return;
        }

        setIsLoading(true); // Start loading

        try {
            if (editMode) {
                console.log(selectedPackage, "selectedPackage");
                console.log(formData, "formData");

                await dispatch(updatePackage({ id: selectedPackage._id, updatedData: formData })).unwrap();
                toast.success("Package Edited Successfully !");
            } else {
                await dispatch(createPackage(formData)).unwrap();
                toast.success("Package Added Successfully !");
            }
            setShowModal(false);
            setEditMode(false);
            resetForm();
        } catch (error) {
            // Log the error and handle it gracefully
            console.error("Failed to save the package:", error);
            toast.error("Failed to save the package.");
        } finally {
            setIsLoading(false); // Stop loading regardless of success or failure
        }
    };

    const handleEdit = (pkg) => {
        setEditMode(true);
        setSelectedPackage(pkg);
        setFormData({
            name: pkg.name,
            description: pkg.description,
            tests: pkg.tests.map((test) => test._id),
            price: pkg.price,
            discountPercent: pkg.discountPercent,
            parameters: pkg.parameters,
        });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        dispatch(deletePackage(id));
        toast.info("Package Deleted successfully...");
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            tests: [],
            price: 0,
            discountPercent: 0,
            parameters: 0,
        });
    };

    return (
        <div className="p-6 card-body-main">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Packages</h1>
                <button
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                >
                    Add Package
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="border border-gray-300 text-white px-4 py-2">Name</th>
                            <th className="border border-gray-300 text-white px-4 py-2">Description</th>
                            <th className="border border-gray-300 text-white px-4 py-2">Price</th>
                            <th className="border border-gray-300 text-white px-4 py-2">Discount (%)</th>
                            <th className="border border-gray-300 text-white px-4 py-2">Final Price</th>
                            <th className="border border-gray-300 text-white px-4 py-2">Parameters</th>
                            <th className="border border-gray-300 text-white px-4 py-2">Tests</th>
                            <th className="border border-gray-300 text-white px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pkg) => (
                            <tr key={pkg._id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{pkg.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{pkg.description}</td>
                                <td className="border border-gray-300 px-4 py-2">{pkg.price}</td>
                                <td className="border border-gray-300 px-4 py-2">{pkg.discountPercent}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {(pkg.price - (pkg.price * pkg.discountPercent) / 100).toFixed(2)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{pkg.parameters}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {pkg.tests.map((test) => test.name).join(", ")}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 md:flex  justify-between items-center ">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                        onClick={() => handleEdit(pkg)}
                                    >
                                        <FaRegEdit />
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleDelete(pkg._id)}
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 pt-16 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-xl sm:w-1/2 h-4/5 rounded-lg shadow-lg overflow-auto p-6 relative">
                        <div className="absolute top-0 right-0 mt-4 mr-4">
                            <button
                                className="text-gray-600 hover:text-gray-800"
                                onClick={() => setShowModal(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">
                            {editMode ? "Edit Package" : "Add Package"}
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Package Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00836C]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00836C]"
                                    rows={3}
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00836C]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Discount (%)</label>
                                    <input
                                        type="number"
                                        name="discountPercent"
                                        value={formData.discountPercent}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00836C]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Parameters</label>
                                    <input
                                        type="number"
                                        name="parameters"
                                        value={formData.parameters}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00836C]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Select Tests</label>
                                <div className="space-y-2">
                                    {tests.map((test) => (
                                        <label key={test._id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.tests.includes(test._id)}
                                                onChange={() => handleTestChange(test._id)}
                                                className="mr-2"
                                            />
                                            <span>{test.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end mt-6">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-2"
                                onClick={() => setShowModal(false)}
                                disabled={isLoading} // Disable the button while loading
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleSubmit}
                                disabled={isLoading} // Disable the button while loading
                            >
                                {isLoading ? "Loading..." : (editMode ? "Update" : "Create")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PackagePage;

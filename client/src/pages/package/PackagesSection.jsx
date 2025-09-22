import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link
import { fetchPackages } from "../../features/package/packageSlice";
import home1 from "../../assets/images/link-image-2.jpg";

const PackagesSection = () => {
    const dispatch = useDispatch();
    const { packages } = useSelector((state) => state.packages);

    useEffect(() => {
        dispatch(fetchPackages());
    }, [dispatch]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="bg-gray-100 py-11">
             <div className="relative w-full">
                    <img
                        src={home1}
                        alt="About Us Banner"
                        className="w-full h-96  object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <h1 className="text-white text-3xl md:text-5xl font-bold">Packages</h1>
                    </div>
                </div>
            <div className="container mx-auto px-4 py-14">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-4">
                    All Packages
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Stay Healthy with Affordable and Reliable Pathology Services
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packages.map((pkg) => (
                        <Link
                            to={`/package/${pkg._id}`} // Navigate to PackageDetail with package ID
                            key={pkg._id}
                            className="border border-primary rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-bold text-lg text-gray-700 mb-2">{pkg.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{pkg.description.split(" ").slice(0, 20).join(" ")}...</p>
                            <div className="flex items-center justify-between text-gray-700 mb-4">
                                <ul className="text-sm text-gray-600 h-16 overflow-auto mb-4">
                                    {pkg.tests.map((test) => (
                                        <li key={test._id}>
                                            {test.name}
                                        </li>
                                    ))}
                                </ul>
                                <span className="text-sm font-bold text-primary">Parameters {pkg.parameters}</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-700 mb-4">
                                <div>
                                    <span className="text-xl font-bold text-primary">₹{pkg.finalPrice.toFixed(0)}.00</span>
                                    <span className="line-through text-gray-500 ml-2">₹{pkg.price}</span>
                                </div>
                                <span className="text-sm bg-green-100 text-primary px-2 py-1 rounded">
                                    {pkg.discountPercent}% off
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <button className="px-4 py-2 bg-primary text-white rounded hover:bg-[#006653] transition">
                                    View Details
                                </button>
                                {/* <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                                    Book Now
                                </button> */}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PackagesSection;
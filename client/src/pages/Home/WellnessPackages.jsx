import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../../features/package/packageSlice";
import { Link } from "react-router-dom";

const WellnessPackages = () => {
    const dispatch = useDispatch();
    const { packages } = useSelector((state) => state.packages);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        dispatch(fetchPackages());
    }, [dispatch]);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="bg-gray-100 p-4 mb-4 mt-4 hide-scrollbar">
            <h1 className="text-2xl font-bold text-black text-center mb-6">
                Top Wellness Packages
            </h1>
            <div className="relative hide-scrollbar">
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                    onClick={scrollLeft}
                >
                    ◀
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto space-x-4 scrollbar-hide"
                >
                    {packages.map((pkg) => (
                        <Link
                            to={`/package/${pkg._id}`}
                            key={pkg._id}
                            className="bg-white border rounded-lg shadow-md p-4 w-72 flex-shrink-0"
                        >
                            <h2 className="text-lg font-bold mb-2">{pkg.name}</h2>
                            <p className="text-sm text-gray-600 mb-4">{pkg.description.split(" ").slice(0, 20).join(" ")}...</p>
                            {/* <ul className="text-sm text-gray-600 mb-4 h-16 overflow-auto">
                                {pkg.tests.map((test) => (
                                    <li key={test._id}>{test.testName}</li>
                                ))}
                            </ul> */}
                            <div className="flex items-center mb-4">
                                <span className="text-lg font-bold text-black">₹{pkg.finalPrice.toFixed(0)}</span>
                                <span className="text-sm text-gray-400 line-through ml-2">₹{pkg.price}</span>
                                <span className="ml-auto text-sm font-semibold text-primary shadow-xl px-2 py-1 rounded">
                                    {pkg.discountPercent}% off
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                {/* <button className="bg-primary text-white px-4 py-2 rounded shadow-md hover:bg-secondary">
                                    Add to Cart
                                </button> */}
                                <button className="border w-full border-secondary text-primary px-6 py-2 rounded shadow-md hover:bg-green-100">
                                   View Details
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                    onClick={scrollRight}
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default WellnessPackages;

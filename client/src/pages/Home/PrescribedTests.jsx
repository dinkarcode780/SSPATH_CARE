// import React, { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTests } from "../../features/test/testSlice";
// import { Link } from "react-router-dom";

// const PrescribedTests = () => {
//     const dispatch = useDispatch();
//     const tests = useSelector((state) => state?.tests?.tests);
//     const testList = Array.isArray(tests) ? tests : []; // ✅ Ensure tests is always an array

//     useEffect(() => {
//         dispatch(fetchTests());
//     }, [dispatch]);

//     const scrollContainerRef = useRef(null);
//     const scrollLeft = () => {
//         scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
//     };
//     const scrollRight = () => {
//         scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
//     };

//     return (
//         <div className="bg-gray-100 pt-2 mb-4  py-4 px-4">
//             <h1 className="text-2xl font-bold text-black text-center mb-6">
//                 Most Prescribed Tests
//             </h1>
//             <div className="relative">
//                 <button
//                     className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white text-primary p-2 rounded-full shadow-md"
//                     onClick={scrollLeft}
//                 >
//                     ◀
//                 </button>
//                 <div
//                     ref={scrollContainerRef}
//                     className="flex overflow-x-auto space-x-4 scrollbar-hide"
//                 >
//                     {testList.map((pkg, index) => (
//                         <Link
//                             to={`/test/${pkg._id}`}
//                             key={index}
//                             className="bg-white border rounded-lg shadow-md px-4 pt-4 w-72 flex-shrink-0"
//                         >
//                             <div className="flex items-center justify-between ">
//                                 <h2 className="text-lg font-bold mb-2">{pkg.name}</h2>
//                                 <h3 className="text-lg font-bold mb-2">{pkg.sampleType}</h3>
//                             </div>
//                             <ul className="text-sm text-gray-600 mb-4">
//                                 <p className="text-md font-bold mb-2">Parameter Cover {pkg.parameter}</p>
//                             </ul>
//                             <div className="flex items-center mb-4">
//                                 <span className="text-lg font-bold text-black">₹{pkg.finalPrice.toFixed(0)}</span>
//                                 <span className="text-sm text-gray-400 line-through ml-2">₹{pkg.price}</span>
//                                 <span className="ml-auto text-sm font-semibold text-primary shadow-xl px-2 py-1 rounded">
//                                     {pkg.discountPercent}% off
//                                 </span>
//                             </div>
//                             <div className="flex space-x-2">
//                                 <button className="border w-full border-secondary text-primary px-4 py-2 rounded shadow-md hover:bg-gray-100">
//                                     View Details
//                                 </button>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//                 <button
//                     className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-primary p-2 rounded-full shadow-md"
//                     onClick={scrollRight}
//                 >
//                     ▶
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PrescribedTests;








import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../../features/test/testSlice";
import { Link } from "react-router-dom";

const PrescribedTests = () => {
    const dispatch = useDispatch();
    const tests = useSelector((state) => state?.tests?.tests);
    const testList = Array.isArray(tests) ? tests : []; // ✅ Ensure tests is always an array

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch]);

    const scrollContainerRef = useRef(null);
    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };
    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="bg-gray-100 h-96 pt-2 mb-4  py-4 px-4">
            <h1 className="text-2xl font-bold text-black text-center ">
                Most Prescribed Tests
            </h1>
           <div className="flex justify-end w-full mb-2">
  <Link
    to="/view-all-test"
    className="inline-block px-6 py-2 text-sm font-semibold text-white bg-[#0A9799] rounded hover:bg-[#689798] transition"
  >
    Show more
  </Link>
</div>


            <div className="relative">
                <button
                    className="absolute -left-4 top-[20%] transform -translate-y-1/2 bg-white text-primary p-2 rounded-full shadow-md"
                    onClick={scrollLeft}
                >
                    ◀
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto space-x-4 scrollbar-hide"
                >
                    {testList.map((pkg, index) => (
                        <Link
                            to={`/test/${pkg._id}`}
                            key={index}
                            className="bg-white border h-full py-3 rounded-lg shadow-md px-4 pt-4 w-72 flex-shrink-0"
                        >
                            <div className="flex items-center justify-between ">
                                <h2 className="text-lg font-bold mb-2">{pkg.name}</h2>
                                {/* <h3 className="text-lg font-bold mb-2">{pkg.sampleType}</h3> */}
                            </div>
                            <ul className="text-sm text-gray-600 mb-4">
                                <p className="text-md font-bold mb-2">Parameter Cover {pkg.parameter}</p>
                            </ul>
                            <div className="flex items-center mb-4">
                                <span className="text-lg font-bold text-black">₹{pkg.finalPrice?.toFixed(0)}</span>
                                <span className="text-sm text-gray-400 line-through ml-2">₹{pkg.price}</span>
                                <span className="ml-auto text-sm font-semibold text-primary shadow-xl px-2 py-1 rounded">
                                    {pkg.discountPercent}% off
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <button className="border w-full border-secondary text-primary px-4 py-2 rounded shadow-md hover:bg-gray-100">
                                    View Details
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
                <button
                    className="absolute right-0 top-[20%] transform -translate-y-1/2 bg-white text-primary p-2 rounded-full shadow-md"
                    onClick={scrollRight}
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default PrescribedTests;




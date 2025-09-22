
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../../features/test/testSlice";
import { Link } from "react-router-dom";

const ViewAllTest = () => {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state?.tests?.tests);
  const testList = Array.isArray(tests) ? tests : [];
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  // const filteredTests = testList.filter((test) => {
  //   const lowerName = test?.name || "name";
  //   const search = searchTerm.toLowerCase();
  //   return (
  //     lowerName.includes(search) ||
  //     test.price.toString().includes(search) ||
  //     test.finalPrice.toString().includes(search)
  //   );
  // });


  const filteredTests = testList?.filter((test) => {
  const lowerName = (test?.name || "").toLowerCase();
  const search = searchTerm?.toLowerCase() || "";

  return (
    lowerName.includes(search) ||
    (test?.price ? test.price.toString() : "").includes(search) ||
    (test?.finalPrice ? test.finalPrice.toString() : "").includes(search)
  );
}) || [];


  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center text-black mt-6">
        Most Prescribed Tests
      </h1>

      {/* 🔍 Search Filter */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by test name or price..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🔬 Test Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTests.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No tests found.</p>
        ) : (
          filteredTests.map((pkg, index) => (
            <Link
              to={`/test/${pkg._id}`}
              key={index}
              className="bg-white border rounded-xl shadow hover:shadow-md transition-all p-5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-md font-semibold text-gray-800">{pkg.name}</h2>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                Parameter Covered:{" "}
                <span className="font-semibold">{pkg.parameter}</span>
              </p>

              <div className="flex items-center mb-4">
                <span className="text-lg font-bold text-black">
                  ₹{(pkg.finalPrice||0).toFixed(0)}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  ₹{pkg.price ||0}
                </span>
                <span className="ml-auto bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                  {pkg.discountPercent||0}% OFF
                </span>
              </div>

              <div className="mt-auto">
                <button className="w-full border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition">
                  View Details
                </button>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Show More Button Example */}
      <div className="flex justify-end mt-8">
        <Link
          to="/view-all-test"
          className="inline-block px-5 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Show More
        </Link>
      </div>
    </div>
  );
};

export default ViewAllTest;

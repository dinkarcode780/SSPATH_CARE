import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../features/search/searchSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchResults = () => {
    const { query } = useParams();
    const dispatch = useDispatch();
    const { results, loading, error } = useSelector((state) => state?.search || {});
    console.log(results);

    useEffect(() => {
        if (query) {
            dispatch(fetchSearchResults(query));
        }
    }, [query, dispatch]);

    return (
        <div className="p-6 pt-20">
            <h2 className="text-2xl font-bold mb-4">
                Showing {results?.tests?.length + results?.packages?.length} results for "{query}" Search
            </h2>
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid md:grid-cols-4 gap-6 overflow-x-hidden">
                {results?.tests?.map((test, index) => (
                    <Link
                        to={`/test/${test._id}`}
                        key={index}
                        className=""
                    >
                        <div key={test._id} className="border rounded-lg p-4 shadow-md">
                            <h3 className="text-lg font-bold text-black">
                                {test.name}
                                <span className="ml-2 text-sm px-2 py-1 bg-primary text-white rounded">Test</span>
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                                Parameters: {test.parameter ? test.parameter.join(", ") : "N/A"}
                            </p>
                            <p className="font-bold text-xl mt-3">₹{test.finalPrice || "N/A"}</p>
                            <button className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white shadow">
                                View Details
                            </button>
                        </div>
                    </Link>
                ))}
                {results?.packages?.map((pkg) => (

                    <div key={pkg._id} className="border rounded-lg p-4 shadow-md">
                        <Link
                            to={`/package/${pkg._id}`}
                            key={pkg._id}
                            className=""
                        >
                            <h3 className="text-lg font-bold text-black">
                                {pkg.name}
                                <span className="ml-2 text-sm px-2 py-1 bg-[#EF8000] text-white rounded">Package</span>
                            </h3>
                            {/* <p className="text-gray-600 text-sm mt-1">
                            Parameters: {Array.isArray(pkg.parameters) ? pkg.parameters.join(", ") : "N/A"}
                        </p> */}
                            {/* <p className="text-gray-700 mt-2">Reports in: {pkg.reportTime || "N/A"}</p> */}
                            <p className="font-bold text-xl mt-3">₹{pkg.finalPrice.toFixed(0) || "N/A"}</p>
                            <button className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white shadow">
                                view details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SearchBar = () => {
//     const [query, setQuery] = useState("");
//     const navigate = useNavigate();

//     const handleSearchChange = (e) => {
//         const newQuery = e.target.value;
//         setQuery(newQuery);

//         navigate(`/search/${newQuery}`);
//     };

//     const handleClearSearch = () => {
//         setQuery('');
//         navigate('/');
//     };

//     return (
//         <div className="relative flex items-center w-full">
//             <input
//                 type="text"
//                 value={query}
//                 onChange={handleSearchChange}
//                 placeholder="Search for a test, package..."
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//             />
//             {query && (
//                 <button
//                     type="button"
//                     onClick={handleClearSearch}
//                     className="absolute right-3 text-black hover:text-gray-700"
//                 >
//                     Cancel
//                 </button>
//             )}
//         </div>
//     );
// };

// export default SearchBar;





import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // original page store karne ke liye
    const originalPath = useRef(null);

    const handleSearchChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        // pehli baar search karne par current path store kar lo
        if (!originalPath.current && location.pathname !== "/" && !location.pathname.startsWith("/search")) {
            originalPath.current = location.pathname;
        }

        if (newQuery.trim() === "") {
            // agar query empty hai -> original path pe wapas bhejo
            if (originalPath.current) {
                navigate(originalPath.current);
                originalPath.current = null; // reset
            } else {
                navigate("/"); // default fallback home
            }
        } else {
            navigate(`/search/${newQuery}`);
        }
    };

    const handleClearSearch = () => {
        setQuery('');
        if (originalPath.current) {
            navigate(originalPath.current);
            originalPath.current = null;
        } else {
            navigate('/');
        }
    };

    return (
        <div className="relative flex items-center w-full">
            <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search for a test, package..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {query && (
                <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 text-black hover:text-gray-700"
                >
                    Cancel
                </button>
            )}
        </div>
    );
};

export default SearchBar;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { FaUser, FaCartPlus, FaPhone, FaBars, FaTimes, FaUpload, FaCloudUploadAlt, FaSearch, FaHome } from "react-icons/fa";
// import { IoIosContacts, IoMdHome } from "react-icons/io"; // Ensure IoMdHome is imported
// import { PiPackageFill } from "react-icons/pi";
// import { motion } from "framer-motion";
// import { fetchCart } from "../../features/cart/cartActions";
// import nbls from "../../assets/icons/nbls.png";
// import ssLogo from "../../assets/icons/sslogo.png";
// import Marquee from "./Marquee";
// import SearchBar from "../../search/Searchbar";

// const Navbar = () => {
//     const dispatch = useDispatch();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
//     const [token, setToken] = useState(null);
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const storedToken = localStorage.getItem("token");
//         if(! storedToken){
//             console.log("No token found in localStorage");
//         } else{

//             setToken(storedToken);
//         }
//     }, [token]);

//     useEffect(() => {
//         const userData = localStorage.getItem("user");
//         if (userData) {
//             const parsedUser = JSON.parse(userData);
//             setUser(parsedUser);
//         }
//     }, []);

//     const { cartItems } = useSelector((state) => state?.cart);
//     const cartLength = cartItems?.items?.length || 0;

//     useEffect(() => {
//         dispatch(fetchCart());
//     }, [dispatch]);

//     const linkClass = ({ isActive }) =>
//         isActive ? "underline font-bold py-2 md:py-0 flex items-center gap-1" : "py-2 md:py-0 flex items-center gap-1 hover:font-bold";

//     return (
//         <header className="bg-white  shadow-md fixed top-0 left-0 w-full z-50 ">
//             <Marquee />
//             {/* Top Section */}
//             <div className="container mx-auto flex items-center justify-between py-4 px-2 md:px-0">
//                 {/* Logo Section */}
//                 <div className="flex items-center space-x-2">
//                     <img
//                         src={ssLogo}
//                         alt="Logo"
//                         className="h-12 w-auto"
//                     />
//                     <img
//                         src={nbls}
//                         alt="Logo"
//                         className="h-12 w-auto"
//                     />
//                 </div>

//                 {/* Search Bar */}
//                 <div className="hidden lg:flex flex-1 mx-4">
//                     <SearchBar />
//                     {/* <input
//                         type="search"
//                         placeholder="Network Of NABL Accredited Laboratories"
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none"
//                     /> */}
//                 </div>
//                 {/* Mobile Search Icon */}
//                 <div className="lg:hidden flex items-center">
//                     <button
//                         onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
//                         className="text-gray-700 text-xl hover:text-[#EF7F00]"
//                     >
//                         <FaSearch />
//                     </button>
//                 </div>

//                 {/* Right Section */}
//                 <div className="hidden md:flex items-center space-x-4">
//                     <div className="flex items-center space-x-2">
//                         <FaPhone className="text-green-600" />
//                         <div className="hidden text-sm lg:block hover:text-[#EF7F00]">
//                             {/* <span>CALL US NOW</span>
//                             <span className=""> 9691497091</span> */}

//                                <li className="list-none">
//     <span className="font-semibold">Call Us:</span>{" "}
//     <a
//       href="tel:+919630045853"
//       className="text-primary hover:underline"
//     >
//       +91 9630045853
//     </a>
//   </li>
//                         </div>
//                     </div>
//                     <h2 className="text-md font-bold text-primary capitalize">
//                         {user ? (
//                             <motion.span
//                                 initial={{ opacity: 0, y: -10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, ease: "easeOut" }}
//                             >
//                                 Welcome, {user?.firstName} 👋
//                             </motion.span>
//                         ) : ("")
//                         }
//                     </h2>
//                     <button className="flex items-center text-gray-700 hover:text-[#EF7F00]">
//                         <FaUser className="text-lg" />
//                         {
//                             token ? (
//                                 <NavLink to="/logout" className="hidden lg:block ml-1">Sign Out</NavLink>
//                             ) : (
//                                 <NavLink to="/login" className="hidden lg:block ml-1">Sign In</NavLink>
//                             )
//                         }
//                     </button>
//                     <NavLink to="/cart" className="relative flex items-center">
//                         <FaCartPlus className="text-gray-700 text-3xl hover:text-[#EF7F00]" />
//                         <span
//                             className={`absolute top-0 right-0 bg-red-500 ${cartLength === 0 ? "animate-pulse" : "animate-bounce"
//                                 } text-white text-xs w-4 h-4 flex items-center justify-center rounded-full`}
//                         >
//                             {cartLength}
//                         </span>

//                     </NavLink>
//                 </div>

//                 {/* Hamburger Menu for Mobile */}
//                 <button
//                     className="md:hidden text-gray-700 text-2xl"
//                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 >
//                     {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//                 </button>
//             </div>

//             {/* Mobile Search Bar */}
//             {isSearchBarOpen && (
//                 <div className="lg:hidden px-4 py-2">
//                     {/* <input
//                         type="text"
//                         placeholder="Search..."
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none"
//                     /> */}
//                     <SearchBar />
//                 </div>
//             )}

//             {/* Mobile Navigation Links */}
//             <nav
//                 className={`${isMobileMenuOpen ? "block" : "hidden"
//                     } bg-primary md:flex md:items-center`}
//             >
//                 <div className="container flex flex-col md:flex-row justify-between py-4 mx-auto px-2">
//                     <ul className="md:flex md:space-x-6 text-white text-md">
//                         <NavLink onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} to="/" className={linkClass}>
//                             <IoMdHome className="text-xl" /> {/* Correctly used IoMdHome */}
//                             <span id="margin-top"> Home</span>
//                         </NavLink>
//                         <NavLink onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} to="/about" className={linkClass}>
//                             <IoIosContacts className="text-xl" />
//                             <span id="margin-top">About</span>
//                         </NavLink>
//                         <NavLink onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} to="/packages" className={linkClass}>
//                             <PiPackageFill className="text-xl" />
//                             <span id="margin-top">Packages</span>
//                         </NavLink>
//                         <NavLink onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} to="/contact" className={linkClass}>
//                             <FaPhone className="" />
//                             <span id="margin-top">Contact</span>
//                         </NavLink>

//                     </ul>
//                     <ul className="md:flex md:space-x-6 text-white text-md md:mt-0 items-center">
//                         <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="py-2 md:py-0 hover:font-bold">
//                             <NavLink to="/download-report" className={linkClass}>
//                                 <FaCloudUploadAlt />
//                                 Download Report
//                             </NavLink>
//                         </li>
//                         <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="py-2 md:py-0 hover:font-bold">
//                             <NavLink to="/upload-prescription" className={linkClass}>
//                                 <FaUpload />
//                                 Upload Prescription
//                             </NavLink>
//                         </li>
//                         <NavLink onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} to="/user" className={`${linkClass} `}>
//                             <FaUser />
//                             <span id="margin-top">My Account</span>
//                         </NavLink>
//                     </ul>
//                 </div>
//             </nav>

//             {/* Bottom Navigation Bar for Mobile */}
//             <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg z-50">
//                 <div className="flex justify-around items-center py-2">
//                     <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/" className="flex flex-col items-center text-gray-700 hover:text-[#EF7F00]">
//                         <FaHome className="text-xl" />
//                         <span className="text-xs">Home</span>
//                     </NavLink>
//                     <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/contact" className="flex flex-col items-center text-gray-700 hover:text-[#EF7F00]">
//                         <FaPhone className="text-xl" />
//                         <span className="text-xs">Contact</span>
//                     </NavLink>
//                     <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/cart" className="flex flex-col items-center text-gray-700 hover:text-[#EF7F00] relative">
//                         <FaCartPlus className="text-xl" />
//                         <span className="text-xs">Cart</span>
//                         <span
//                             className={`absolute top-0 right-0 bg-red-500 ${cartLength === 0 ? "animate-pulse" : "animate-bounce"
//                                 } text-white text-xs w-4 h-4 flex items-center justify-center rounded-full`}
//                         >
//                             {cartLength}
//                         </span>
//                     </NavLink>
//                     <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/user" className="flex flex-col items-center text-gray-700 hover:text-[#EF7F00]">
//                         <FaUser className="text-xl" />
//                         <span className="text-xs">Account</span>
//                     </NavLink>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Navbar;










import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaUser, FaCartPlus, FaPhone, FaBars, FaTimes, FaUpload, FaCloudUploadAlt, FaSearch, FaHome } from "react-icons/fa";
import { IoIosContacts, IoMdHome } from "react-icons/io";
import { PiPackageFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { fetchCart } from "../../features/cart/cartActions";
import nbls from "../../assets/icons/nbls.png";
import ssLogo from "../../assets/icons/sslogo.png";
import Marquee from "./Marquee";
import SearchBar from "../../search/Searchbar";

const Navbar = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;


    const { cartItems } = useSelector((state) => state.cart);
    const cartLength = cartItems?.items?.length || 0;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const linkClass = ({ isActive }) =>
        isActive ? "underline font-bold py-2 md:py-0 flex items-center gap-1" : "py-2 md:py-0 flex items-center gap-1 hover:font-bold";

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <Marquee />
            {/* Top Section */}
            <div className="container mx-auto flex items-center justify-between py-4 px-2 md:px-0">
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <img
                        src={ssLogo}
                        alt="Logo"
                        className="h-12 w-auto"
                    />
                    <img
                        src={nbls}
                        alt="Logo"
                        className="h-12 w-auto"
                    />
                </div>

                {/* Search Bar */}
                <div className="hidden lg:flex flex-1 mx-4">
                    <SearchBar />
                </div>
                {/* Mobile Search Icon */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
                        className="text-gray-700 text-xl hover:text-[#EF7F00]"
                    >
                        <FaSearch />
                    </button>
                </div>

                {/* Right Section */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <FaPhone className="text-green-600" />
                        <div className="hidden text-sm lg:block hover:text-[#EF7F00]">
                            <li className="list-none">
                                <span className="font-semibold">Call Us:</span>{" "}
                                <a
                                    href="tel:+919630045853"
                                    className="text-primary hover:underline"
                                >
                                    +91 9630045853
                                </a>
                            </li>
                        </div>
                    </div>
                    <h2 className="text-md font-bold text-primary capitalize">
                        {user ? (
                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                Welcome, {user?.firstName} 👋
                            </motion.span>
                        ) : ""}
                    </h2>
                    <button className="flex items-center text-gray-700 hover:text-[#EF7F00]">
                        <FaUser className="text-lg" />
                        {token ? (
                            <NavLink to="/logout" className="hidden lg:block ml-1">Sign Out</NavLink>
                        ) : (
                            <NavLink to="/login" className="hidden lg:block ml-1">Sign In</NavLink>
                        )}
                    </button>
                    <NavLink to="/cart" className="relative flex items-center">
                        <FaCartPlus className="text-gray-700 text-3xl hover:text-[#EF7F00]" />
                        <span
                            className={`absolute top-0 right-0 bg-red-500 ${cartLength === 0 ? "animate-pulse" : "animate-bounce"
                                } text-white text-xs w-4 h-4 flex items-center justify-center rounded-full`}
                        >
                            {cartLength}
                        </span>
                    </NavLink>
                </div>

                {/* Hamburger Menu for Mobile */}
                <button
                    className="md:hidden text-gray-700 text-2xl"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Search Bar */}
            {isSearchBarOpen && (
                <div className="lg-hidden px-4 py-2">
                    <SearchBar />
                </div>
            )}

            {/* Mobile Navigation Links */}
            <nav
                className={`${isMobileMenuOpen ? "block" : "hidden"
                    } bg-primary md:flex md:items-center`}
            >
                <div className="container flex flex-col md:flex-row justify-between py-4 mx-auto px-2">
                    <ul className="md:flex md:space-x-6 text-white text-md">
                        <NavLink onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} to="/" className={linkClass}>
                            <IoMdHome className="text-xl" />
                            <span id="margin-top"> Home</span>
                        </NavLink>
                        <NavLink onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} to="/about" className={linkClass}>
                            <IoIosContacts className="text-xl" />
                            <span id="margin-top">About</span>
                        </NavLink>
                        <NavLink onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} to="/packages" className={linkClass}>
                            <PiPackageFill className="text-xl" />
                            <span id="margin-top">Packages</span>
                        </NavLink>
                        <NavLink onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} to="/contact" className={linkClass}>
                            <FaPhone className="" />
                            <span id="margin-top">Contact</span>
                        </NavLink>
                    </ul>
                    <ul className="md:flex md:space-x-6 text-white text-md md:mt-0 items-center">
                        <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="py-2 md:py-0 hover:font-bold">
                            <NavLink to="/download-report" className={linkClass}>
                                <FaCloudUploadAlt />
                                Download Report
                            </NavLink>
                        </li>
                        <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="py-2 md:py-0 hover:font-bold">
                            <NavLink to="/upload-prescription" className={linkClass}>
                                <FaUpload />
                                Upload Prescription
                            </NavLink>
                        </li>
                        <NavLink onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} to="/user" className={`${linkClass} `}>
                            <FaUser />
                            <span id="margin-top">My Account</span>
                        </NavLink>
                    </ul>
                </div>
            </nav>

            {/* Bottom Navigation Bar for Mobile */}
            <div className="md-hidden fixed bottom-0 left-0 w-full bg-white shadow-lg z-50">
                <div className="flex justify-around items-center py-2">
                    <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/" className="flex flex-col items-center text-gray-700 hover:text-[#EF7F00]">
                        <FaHome className="text-xl" />
                        <span className="text-xs">Home</span>
                    </NavLink>
                    <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/contact" className="flex flex-col items-center text-gray-700 hover:text-[#EF7F00]">
                        <FaPhone className="text-xl" />
                        <span className="text-xs">Contact</span>
                    </NavLink>
                    <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/cart" className="flex flex-col items-center text-gray-700 hover:text-[#EF7F00] relative">
                        <FaCartPlus className="text-xl" />
                        <span className="text-xs">Cart</span>
                        <span
                            className={`absolute top-0 right-0 bg-red-500 ${cartLength === 0 ? "animate-pulse" : "animate-bounce"
                                } text-white text-xs w-4 h-4 flex items-center justify-center rounded-full`}
                        >
                            {cartLength}
                        </span>
                    </NavLink>
                    <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/user" className="flex flex-col items-center text-gray-700 hover:text-[#EF7F00]">
                        <FaUser className="text-xl" />
                        <span className="text-xs">Account</span>
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

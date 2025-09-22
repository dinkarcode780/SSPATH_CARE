import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { useEffect } from "react";
import ssLogo from "../assets/icons/ssLogo.png";
import nbls from "../assets/icons/nbls.png";

// import "./Navbar.css"; // Assuming you have this CSS file

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        } else {
            setUserData(null); // Ensure it clears on logout
        }
    }, []);

    if (!userData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-xl font-semibold">Loading Profile...</h1>
            </div>
        );
    }

    const { profilePhoto, email, mobileNumber, name, role } = userData;

    return (
        <header className="navbar fixed-top">
            <div className="navbar-container">
                {/* Left: Logo */}
                <div className="navbar-left w-32 flex gap-1">
                    <img src={ssLogo} alt="ssLogo" />
                    <img className="h-10" src={nbls} alt="ssLogo" />
                </div>

                {/* Center: Welcome Message */}
                <div className="navbar-center">
                    <p>Welcome🙏  {name}</p>
                </div>

                {/* Right: Navigation Links and Profile */}
                <div className="right">
                    <div className={`navbar-right ${isMenuOpen ? "menu-open" : ""}`}>
                        {/* <nav className="navbar-links">
                        <Link to="/">Home</Link>
                    </nav> */}
                    </div>


                    {/* Profile Dropdown */}
                    <div className="profile-dropdown w-70">
                        <img
                            src={profilePhoto}
                            alt="Profile"
                            className="profile-icon object-cover rounded-full"
                        />
                        {/* <div className="dropdown-menu">
                        <Link to="/profile">My Profile</Link>
                        <Link to="/edit-profile">Edit Profile</Link>
                        <Link to="/logout">Logout</Link>
                    </div> */}
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Navbar;
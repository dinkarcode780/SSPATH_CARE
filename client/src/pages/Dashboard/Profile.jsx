import React, { useEffect, useState } from "react";

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
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
        <div className="py-12 bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
                {/* Profile Photo */}
                <div className="bg-primary p-6 flex justify-center">
                    <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                    />
                </div>
                {/* User Details */}
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">
                        {name}
                    </h2>
                    <p className="text-gray-600 text-center">{email}</p>
                    <p className="text-gray-600 text-center">{mobileNumber}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;

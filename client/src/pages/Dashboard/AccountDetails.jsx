// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateUser} from "../../features/auth/AuthSlice";
// import { toast } from "react-toastify";

// const AccountDetails = () => {
//   const dispatch = useDispatch();
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     mobileNumber: "",
//     email: "",
//     currentPassword: "",
//     newPassword: "",
//     confirmNewPassword: "",
//   });

  

//   useEffect(() => {
//     // Fetch user details from localStorage
//     const userDetails = localStorage.getItem("user");
//     if (userDetails) {
//       // Parse the JSON string into an object
//       const parsedUser = JSON.parse(userDetails);
//       setUser(parsedUser);
//       // Initialize form data with user details
//       setFormData({
//         firstName: parsedUser.firstName || "",
//         lastName: parsedUser.lastName || "",
//         mobileNumber: parsedUser.mobileNumber || "",
//         email: parsedUser.email || "",
//       });
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
  

//   const handleSubmit = (e) => {
//     e.preventDefault();


//     // Prepare the updated user data
//     const updatedUserData = {
//       ...user,
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       mobileNumber: formData.mobileNumber,
//       email: formData.email,
//     };

//     // Dispatch the updateUser action
//     dispatch(updateUser(updatedUserData));

//     // Optionally, update localStorage with the new data
//     localStorage.setItem("user", JSON.stringify(updatedUserData));

//     // Show success message
//     toast.success("User details updated successfully!");
//   };

//   if (!user) {
//     return <div className="text-center py-10">Loading...</div>;
//   }
  

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg px-8 py-2">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Details</h2>

//       <form onSubmit={handleSubmit}>
//         {/* Personal Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="md:col-span-1 col-span-2">
//             <label className="block text-gray-600 text-sm mb-2">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               placeholder="First Name"
//               className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm mb-2">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               placeholder="Last Name"
//               className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="block text-gray-600 text-sm mb-2">Mobile Number</label>
//             <input
//               type="text"
//               name="mobileNumber"
//               value={formData.mobileNumber}
//               onChange={handleInputChange}
//               placeholder="Mobile Number"
//               className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>
//           <div className="col-span-2">
//             <label className="block text-gray-600 text-sm mb-2">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Email Address"
//               className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>
//         </div>
//         <div className="mt-6">
//           <button
//             type="submit"
//             className="w-full md:w-auto bg-primary text-white rounded-lg px-6 py-3 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AccountDetails;











import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser} from "../../features/auth/AuthSlice";
import { toast } from "react-toastify";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to handle loading status
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  

  useEffect(() => {
    // Fetch user details from localStorage
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      // Parse the JSON string into an object
      const parsedUser = JSON.parse(userDetails);
      setUser(parsedUser);
      // Initialize form data with user details
      setFormData({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        mobileNumber: parsedUser.mobileNumber || "",
        email: parsedUser.email || "",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      // Prepare the updated user data
      const updatedUserData = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
      };

      // Dispatch the updateUser action
       dispatch(updateUser(updatedUserData));

      // Optionally, update localStorage with the new data
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      })

      // Show success message
      toast.success("User details updated successfully!");
    } catch (error) {
      toast.error("Failed to update user details.");
    } finally {
      setIsLoading(false); // Stop loading regardless of the outcome
    }
  };

  if (!user) {
    return <div className="text-center py-10">Loading...</div>;
  }
  

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg px-8 py-2">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Details</h2>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1 col-span-2">
            <label className="block text-gray-600 text-sm mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 text-sm mb-2">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 text-sm mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading} // Disable the button while loading
            className="w-full md:w-auto bg-primary text-white rounded-lg px-6 py-3 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;

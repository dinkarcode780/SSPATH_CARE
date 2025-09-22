import React, { useState } from "react";
import { HomeCollection } from "../../features/homecollection/homecollectionService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCities } from "../../features/city/citiesSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const HomeCollectionForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        mobileNumber: "",
        city: "",
        consent: false,
    });

    const { cities, status, error } = useSelector((state) => state.cities);

    useEffect(() => {
        dispatch(fetchCities());
    }, [dispatch]);


    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Validate form
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.mobileNumber.trim() || !/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "A valid 10-digit mobile number is required.";
        }
        if (!formData.city) newErrors.city = "Please select a city.";
        if (!formData.consent) newErrors.consent = "Consent is required.";
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            const response = await dispatch(HomeCollection(formData)).unwrap();
            toast.success("Form submitted successfully!");
            setFormData({
                name: "",
                mobileNumber: "",
                city: "",
                consent: false,
            });
        } catch (error) {
            console.log(error);

            toast.error(error || "Form submission failed.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div>
            <h2 className="text-xl font-bold text-primary mb-4">
                Schedule a Home Collection
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        What's your name? *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"
                            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Mobile number *
                    </label>
                    <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Enter your mobile number"
                        className={`w-full border ${errors.mobileNumber ? "border-red-500" : "border-gray-300"
                            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600`}
                    />
                    {errors.mobileNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Select Your City *
                    </label>
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full border ${errors.city ? "border-red-500" : "border-gray-300"
                            } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600`}
                    >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                    {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                </div>
                <div className="flex items-start">
                    <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        id="consent"
                        className="h-4 w-4 text-primary border-gray-300 rounded"
                    />
                    <label
                        htmlFor="consent"
                        className="ml-2 text-sm text-gray-600"
                    >
                        I authorize Sun Shine Pathcare Labs and its affiliates to contact me.
                    </label>
                </div>
                {errors.consent && (
                    <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
                )}
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary hover:bg-opacity-90"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default HomeCollectionForm;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPackageById } from "../../features/package/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../features/booking/bookingSlice";
import  {addToCart}  from '../../features/cart/cartActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component

const PackageDetail = () => {
    const { id } = useParams(); // Get package ID from URL
    const [packageData, setPackageData] = useState(null);
    const [openTest, setOpenTest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [quantity, setQuantity] = useState(1); // State to manage quantity
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(packageData, "packageData");
    console.log(quantity, "quantity")

   const token = localStorage.getItem('token');  
   if(token){
    console.log("token from package", token)
   }
   

    const packageById = useSelector((state) => state.packages.package);
    useEffect(() => {
        setPackageData(packageById);
    }, [packageById]);

    useEffect(() => {
        dispatch(fetchPackageById(id));
    }, [dispatch, id]);

    if (!packageData) {
        return <div className="text-center py-10">Loading...</div>;
    }

    const toggleTestDetails = (index) => {
        setOpenTest(openTest === index ? null : index);
    };

   
    const handleBookNow = () => {

        if(! token){
            toast.warn('Please login to book the package');
           navigate('/login')
             
            
        }else{
            setIsModalOpen(true);
        }
    }



    const handleConfirmBooking = () => {
        dispatch(createBooking({ packageId: packageData._id, tests: [] }));
        toast.success('Your Package Booked Successfully');
        navigate("/user/booking-list");
        setIsModalOpen(false); 
    };

    const handleCancelBooking = () => {
        setIsModalOpen(false); // Close the modal
    };



    const handleAddToCart = () => {
        if(! token){
            
            toast.warn('Please login to add items to cart');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }else{
            dispatch(addToCart({ itemId: packageData._id, quantity }));
            toast.success('Package added to cart successfully');
        }
    }


    return (
        <section className="bg-gray-100 min-h-screen">
            {/* Banner Section */}
            <div className="relative h-20 md:h-36 w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-opacity-50 flex pt-10 md:pt-20 items-center justify-center">
                    <h1 className="text-black text-3xl md:text-5xl font-bold">Package</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-10">
                {/* Package Header */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-primary">
                                {packageData.name} Complete Package
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Special Instruction: 8 hours fasting is mandatory
                            </p>
                            <p className="text-gray-500">
                                Parameters covered: {packageData.parameters} | Report Frequency: Daily
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-primary">₹{packageData.finalPrice.toFixed(0)}.00</p>
                            <div className="flex items-center justify-end  gap-2">
                                <p className="line-through text-gray-500">₹{packageData.price}</p>
                                <span className="text-sm bg-green-100 text-primary px-1 py-1 rounded">
                                    {packageData.discountPercent}% off
                                </span>
                            </div>
                            {/* <p className="text-sm text-green-600">
                                Price for home collection only
                            </p> */}
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                        <div className="flex items-center gap-2">
                            <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                                min="1"
                                className="w-16 px-2 py-1 border border-gray-300 rounded"
                            />
                        </div>
                        <button onClick={handleAddToCart} className="px-6 py-2 bg-primary text-white rounded hover:bg-[#006653] transition">
                            Add to Cart
                        </button>
                        <button onClick={handleBookNow} className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                            Book Now
                        </button>
                    </div>
                </div>

                {/* Understanding Package */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                    <h2 className="text-xl font-bold text-gray-800">
                        Understanding {packageData.name} Package
                    </h2>
                    <p className="text-gray-600 mt-4">{packageData.description}</p>
                </div>

                {/* What does the package measure? */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                    <h2 className="text-xl font-bold text-gray-800">
                        What does {packageData.name} Package measure?
                    </h2>
                    <div className="mt-6">
                        {packageData.tests.map((test, index) => (
                            <div
                                key={test._id}
                                className="border-b border-gray-200 py-4 flex flex-col"
                            >
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleTestDetails(index)}
                                >
                                    <p className="text-gray-800 font-medium">{test.name}</p>
                                    <span
                                        className={`text-gray-500 transition-transform transform ${openTest === index ? "rotate-180" : "rotate-0"
                                            }`}
                                    >
                                        ▼
                                    </span>
                                </div>
                                {openTest === index && (
                                    <div
                                        className="mt-4 bg-gray-50 p-4 rounded-md text-gray-600 shadow-md"
                                        style={{ animation: "fadeIn 0.3s ease-in-out" }}
                                    >
                                        {test.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCancelBooking}
                onConfirm={handleConfirmBooking}
            />
        </section>
    );
};

export default PackageDetail;
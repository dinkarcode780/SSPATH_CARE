import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTestById } from "../../features/test/testSlice";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../features/booking/bookingSlice";
import { addToCart } from '../../features/cart/cartActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../package/ConfirmationModal';

const TestDetail = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const packageData = useSelector((state) => state?.tests?.tests) || null;
      const token = localStorage.getItem('token');  
   if(token){
    console.log("token from  test detail", token)
   }

    useEffect(() => {
        dispatch(fetchTestById(id));
    }, [dispatch, id]);

    if (!packageData) {
        return <div className="text-center py-10">Loading...</div>;
    }

    const handleBookNow = () => {
        setIsModalOpen(true);
    };

    const handleConfirmBooking = () => {
        if(token){
             const testId = packageData._id;
        const packageId = packageData._id;
        dispatch(createBooking({ tests:[ testId],packageId  }));
        toast.success('Your test Booked Successfully');
        navigate("/user/booking-list");
        setIsModalOpen(false);
        } else{
            toast.warn('Please login to book the test');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    };

    const handleCancelBooking = () => {
        setIsModalOpen(false);
    };

    const handleAddToCart = () => {
         if( token){
             dispatch(addToCart({ itemId: packageData._id, quantity }));
        toast.success('Test added to cart successfully');
         }   else{
            toast.warn('Please login to add the test to cart');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
         }
    }; 

    return (
        <section className="bg-gray-100 min-h-screen">
            {/* Banner Section */}
            <div className="relative h-20 md:h-36 w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-opacity-50 flex pt-10 md:pt-20 items-center justify-center">
                    <h1 className="text-black text-3xl md:text-5xl font-bold">Test Details</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-10">
                {/* Test Header */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-primary">
                                {packageData.name} Test
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Sample Type: {packageData.sampleType}
                            </p>
                            <p className="text-gray-500">
                                Parameters Covered: {packageData && packageData.parameter} | Duration: {packageData.duration}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-primary">₹{packageData.finalPrice}.00</p>
                            <div className="flex items-center justify-end gap-2">
                                <p className="line-through text-gray-500">₹{packageData.price}</p>
                                <span className="text-sm bg-green-100 text-primary px-1 py-1 rounded">
                                    {packageData.discountPercent}% off
                                </span>
                            </div>
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

                {/* Test Description */}
                <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                    <h2 className="text-xl font-bold text-gray-800">
                        Understanding {packageData.testName} Test
                    </h2>
                    <p className="text-gray-600 mt-4">{packageData.description}</p>
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

export default TestDetail;

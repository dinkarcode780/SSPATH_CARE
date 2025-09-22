// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchCart, updateCart, removeFromCart } from "../features/cart/cartActions";
// import { toast } from "react-toastify";
// import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
// import openRazorpay from "../utils/razorpay"


// const CartPage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { cartItems, loading, error } = useSelector((state) => state?.cart);

   
//     useEffect(()=>{
//            dispatch(fetchCart());
//             console.log("Cart items fetched:", cartItems);
//     }, [dispatch])


//     const handleIncreaseQuantity = (itemId) => {
//         dispatch(updateCart({ itemId, action: "increase" })).then(() => {
//             dispatch(fetchCart()); 
//         });
//     };

//     const handleDecreaseQuantity = (itemId) => {
//         dispatch(updateCart({ itemId, action: "decrease" })).then(() => {
//             dispatch(fetchCart());
//         });
//     };

//     const handleRemoveItem = (itemId) => {
//         dispatch(removeFromCart({ itemId })).then(() => {
//             dispatch(fetchCart());
//         });
//     };




// const handleBookCart = async () => {
//     try {
//         console.log('Opening Razorpay for payment...');

//         const result = await openRazorpay(
//             subtotal, 
//             "INR",
//             dispatch  
//         );

//         console.log('Complete process finished:', result);
//         dispatch(fetchCart()); // Refresh cart after booking
//         toast.success("Payment successful, booking created!");
       
//     } catch (error) {
//         console.error("Payment process error:", error);

//         if (error.message === 'Payment cancelled by user') {
//             console.log('User cancelled the payment - no order created');
//         } else {
//             console.error(`Process failed: ${error.message}`);
//             toast.error(`Process failed: ${error.message}`);
//         }
//     }
// };



//     // Ensure finalPrice is valid before performing calculations
//     const subtotal = cartItems?.items?.reduce((total, item) => {
//         const price = item.itemId?.finalPrice || 0;
//         return total + price * item.quantity;
//     }, 0) || 0;

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     return (
//         <div className="container mx-auto p-4 md:py-16">
//             <div className="flex flex-col lg:flex-row gap-6">
//                 {/* Cart Items Section */}
//                 <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//                     <h1 className="text-2xl font-bold mb-6">🛒 Shopping Cart</h1>
//                     {loading && <p className="text-gray-600">Loading...</p>}
//                     {error && <p className="text-red-500">Error: {error.message}</p>}
//                     {cartItems.length === 0 ? (
//                         <p className="text-gray-600">Your cart is empty.</p>
//                     ) : (
//                         <div className="overflow-x-auto w-full">
//                             <table className="table-auto w-full min-w-[600px] text-left border-collapse">
//                                 <thead>
//                                     <tr className="border-b text-gray-700 bg-gray-100">
//                                         <th className="py-3 px-2 whitespace-nowrap">Product</th>
//                                         <th className="px-2 whitespace-nowrap">Price</th>
//                                         <th className="px-2 whitespace-nowrap">Quantity</th>
//                                         <th className="px-2 whitespace-nowrap">Subtotal</th>
//                                         <th className="px-2 whitespace-nowrap">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {cartItems && cartItems?.items  && cartItems && cartItems?.items?.map((item) => {
//                                         const price = item.itemId?.finalPrice || 0;
//                                         return (
//                                             <tr key={item?.itemId?._id} className="border-b hover:bg-gray-50 transition">
//                                                 <td className="py-4 px-2 flex items-center gap-3">
//                                                     <p className="font-semibold whitespace-nowrap">{item?.itemId?.name}</p>
//                                                 </td>
//                                                 <td className="text-gray-800 px-2 whitespace-nowrap">₹{price.toFixed(2)}</td>
//                                                 <td className="px-2 whitespace-nowrap">
//                                                     <div className="flex items-center space-x-2">
//                                                         <button
//                                                             onClick={() => handleDecreaseQuantity(item?.itemId?._id)}
//                                                             className="p-2 border rounded bg-gray-200 hover:bg-gray-300 transition"
//                                                         >
//                                                             <FaMinus className="text-sm" />
//                                                         </button>
//                                                         <span className="px-2">{item.quantity}</span>
//                                                         <button
//                                                             onClick={() => handleIncreaseQuantity(item?.itemId?._id)}
//                                                             className="p-2 border rounded bg-gray-200 hover:bg-gray-300 transition"
//                                                         >
//                                                             <FaPlus className="text-sm" />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                                 <td className="text-gray-800 px-2 whitespace-nowrap">₹{(price * item.quantity).toFixed(2)}</td>
//                                                 <td className="px-2 whitespace-nowrap">
//                                                     <button
//                                                         onClick={() => handleRemoveItem(item?.itemId?._id)}
//                                                         className="text-red-500 hover:text-red-700 transition"
//                                                     >
//                                                         <FaTrash className="text-lg" />
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>

//                     )}
//                 </div>

//                 {/* Cart Summary Section */}

                
//                 <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
//                     <h2 className="text-xl font-bold mb-6"> Cart Total</h2>
//                     <div className="space-y-4 text-gray-800">
//                         <div className="flex justify-between">
//                             <span>Subtotal:</span>
//                             <span>₹{subtotal.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between font-bold text-lg">
//                             <span>Total:</span>
//                             <span>₹{subtotal.toFixed(2)}</span>
//                         </div>
//                     </div>
//                     <button
//                         onClick={handleBookCart}
//                         className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition"
//                     >
//                         Book Now
//                     </button>
//                 </div>

                
//             </div>
//         </div>);

        
// };

// export default CartPage;





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart, updateCart, removeFromCart } from "../features/cart/cartActions";
import { toast } from "react-toastify";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import openRazorpay from "../utils/razorpay"


const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, loading, error } = useSelector((state) => state?.cart);
    // Add a new state variable to track if the booking is in progress
    const [isBooking, setIsBooking] = useState(false);

    
    useEffect(()=>{
        dispatch(fetchCart());
        console.log("Cart items fetched:", cartItems);
    }, [dispatch])


    const handleIncreaseQuantity = (itemId) => {
        dispatch(updateCart({ itemId, action: "increase" })).then(() => {
            dispatch(fetchCart()); 
        });
    };

    const handleDecreaseQuantity = (itemId) => {
        dispatch(updateCart({ itemId, action: "decrease" })).then(() => {
            dispatch(fetchCart());
        });
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart({ itemId })).then(() => {
            dispatch(fetchCart());
        });
    };



    const handleBookCart = async () => {
        // Step 1: Add a check to prevent multiple requests
        if (isBooking) {
            return;
        }
        // Set the booking state to true to disable the button
        setIsBooking(true);

        try {
            console.log('Opening Razorpay for payment...');

            const result = await openRazorpay(
                subtotal, 
                "INR",
                dispatch  
            );

            console.log('Complete process finished:', result);
            dispatch(fetchCart()); // Refresh cart after booking
            toast.success("Payment successful, booking created!");
            
        } catch (error) {
            console.error("Payment process error:", error);

            if (error.message === 'Payment cancelled by user') {
                console.log('User cancelled the payment - no order created');
            } else {
                console.error(`Process failed: ${error.message}`);
                toast.error(`Process failed: ${error.message}`);
            }
        } finally {
            // Step 2: Reset the booking state to false after the process is complete
            setIsBooking(false);
        }
    };


    // Ensure finalPrice is valid before performing calculations
    const subtotal = cartItems?.items?.reduce((total, item) => {
        const price = item.itemId?.finalPrice || 0;
        return total + price * item.quantity;
    }, 0) || 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mx-auto p-4 md:py-16">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Cart Items Section */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">🛒 Shopping Cart</h1>
                    {loading && <p className="text-gray-600">Loading...</p>}
                    {error && <p className="text-red-500">Error: {error.message}</p>}
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600">Your cart is empty.</p>
                    ) : (
                        <div className="overflow-x-auto w-full">
                            <table className="table-auto w-full min-w-[600px] text-left border-collapse">
                                <thead>
                                    <tr className="border-b text-gray-700 bg-gray-100">
                                        <th className="py-3 px-2 whitespace-nowrap">Product</th>
                                        <th className="px-2 whitespace-nowrap">Price</th>
                                        <th className="px-2 whitespace-nowrap">Quantity</th>
                                        <th className="px-2 whitespace-nowrap">Subtotal</th>
                                        <th className="px-2 whitespace-nowrap">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems && cartItems?.items  && cartItems && cartItems?.items?.map((item) => {
                                        const price = item.itemId?.finalPrice || 0;
                                        return (
                                            <tr key={item?.itemId?._id} className="border-b hover:bg-gray-50 transition">
                                                <td className="py-4 px-2 flex items-center gap-3">
                                                    <p className="font-semibold whitespace-nowrap">{item?.itemId?.name}</p>
                                                </td>
                                                <td className="text-gray-800 px-2 whitespace-nowrap">₹{price.toFixed(2)}</td>
                                                <td className="px-2 whitespace-nowrap">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => handleDecreaseQuantity(item?.itemId?._id)}
                                                            className="p-2 border rounded bg-gray-200 hover:bg-gray-300 transition"
                                                        >
                                                            <FaMinus className="text-sm" />
                                                        </button>
                                                        <span className="px-2">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleIncreaseQuantity(item?.itemId?._id)}
                                                            className="p-2 border rounded bg-gray-200 hover:bg-gray-300 transition"
                                                        >
                                                            <FaPlus className="text-sm" />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="text-gray-800 px-2 whitespace-nowrap">₹{(price * item.quantity).toFixed(2)}</td>
                                                <td className="px-2 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleRemoveItem(item?.itemId?._id)}
                                                        className="text-red-500 hover:text-red-700 transition"
                                                    >
                                                        <FaTrash className="text-lg" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                    )}
                </div>

                {/* Cart Summary Section */}

                
                <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-6"> Cart Total</h2>
                    <div className="space-y-4 text-gray-800">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleBookCart}
                        // Step 3: Disable the button based on the isBooking state and display a loader
                        disabled={isBooking}
                        className={`mt-6 w-full text-white py-3 rounded-lg transition font-medium ${isBooking ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary'}`}
                    >
                        {/* Change button text and add a simple loader */}
                        {isBooking ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Booking...
                            </div>
                        ) : (
                            'Book Now'
                        )}
                    </button>
                </div>

                
            </div>
        </div>);

        
};

export default CartPage;
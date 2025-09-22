import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const PaymentPage = () => {
    const { reportId } = useParams(); // Get reportId from URL
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    // Handle Payment Submission
    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        toast.success(`Payment successful for report ${reportId}`);
        navigate('/download-report'); 
    };

    return (
        <div className="py-10 pt-20 flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Payment</h1>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="creditCard">Credit Card</option>
                            <option value="debitCard">Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="netBanking">Net Banking</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CVV</label>
                            <input
                                type="text"
                                placeholder="123"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary focus:outline-none"
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
// src/api/cartBookingAPI.js
// import apiClient from "apiClient";
import apiClient from '../../pages/Home/api/apiClient';



// ✅ Book Cart Items
export const createPaymentOrderAPI = async (amount) => {
  const response = await apiClient.post(`/api/v1/cart-booking/book`, 
    { amount }, 
    { withCredentials: true }
  );
  console.log("create order response", response);
  return response.data;
};



// verify payment api
export const verifyPaymentAPI = async (data) => {
  const response = await apiClient.put("/api/v1/cart-booking/verify", data, {
    withCredentials: true
  });
  return response.data;
};







// ✅ Get User Bookings
export const fetchUserBookingsAPI = async () => {
    const response = await apiClient.get(`/api/v1/cart-booking/`, { withCredentials: true });
    return response.data;
};
export const fetchallUserBookingsAPI = async () => {
    const response = await apiClient.get(`/api/v1/cart-booking/all`, { withCredentials: true });
    return response.data;
};

// ✅ Update Booking Status (Admin Only)
export const updateBookingStatusAPI = async (bookingId, status) => {
    const response = await apiClient.put(`/api/v1/cart-booking/update-status`, { bookingId, status }, { withCredentials: true });
    return response.data;
};

// ✅ Cancel Booking
export const cancelBookingAPI = async (bookingId,status) => {
    const response = await apiClient.post(`/api/v1/cart-booking/update-status`, { bookingId,status }, { withCredentials: true });
    return response.data;
};

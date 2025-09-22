export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  export const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  export const checkAuthExpiry = () => {
    const timestamp = localStorage.getItem('timestamp');
    if (timestamp) {
        const now = new Date().getTime();
        const expiryTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (now - timestamp > expiryTime) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('timestamp');
            return true; // Indicates data has expired
        }
    }
    return false; // Data is still valid
};

  



export const openRazorpay = (orderId, amount, currency) => {
  const options = {
    key: "YOUR_RAZORPAY_KEY_ID", 
    amount: amount,
    currency:currency,
    name: "Your App Name",
    description: "Booking Payment",
    order_id: orderId,
    handler: async function (response) {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

      // Step 3: Verify payment
      await verifyPayment({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

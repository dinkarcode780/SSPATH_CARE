


// // Updated razorpayUtils.js with correct action names
// import { createPaymentOrder, verifyPayment } from "../features/cartbooking/cartBookingSlice";

// const openRazorpay = (amount,currency, dispatch) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const razorPayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      
//       console.log("razorpaykey", razorPayKey);

//       if (!razorPayKey) {
//         reject(new Error('Razorpay key not configured. Please check your .env file'));
//         return;
//       }

//       // Step 1: Create Razorpay order first
//       console.log('Creating Razorpay order...');
//       const orderResult = await dispatch(createPaymentOrder(amount));
      
//       if (!createPaymentOrder.fulfilled.match(orderResult)) {
//         throw new Error('Failed to create Razorpay order');
//       }

//       const { orderId, amount: orderAmount, currency: orderCurrency } = orderResult.payload;
//       console.log('Razorpay order created:', { orderId, orderAmount, orderCurrency });

//       // Step 2: Open Razorpay with the order details
//       const options = {
//         key: razorPayKey,
//         amount: orderAmount, // Already in paise from backend
//         currency: orderCurrency,
//         name: "Sunshine",
//         description: "Cart Booking Payment",
//         order_id: orderId, // Razorpay order ID

//         handler: async function (response) {
//           try {
//             console.log('Payment successful, now verifying and booking...');
            
//             // Step 3: Verify payment (this will also create the actual booking)
//             const verificationData = {
//               order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             };

//             const verifyResult = await dispatch(verifyPayment(verificationData));

//             if (verifyPayment.fulfilled.match(verifyResult)) {
//               console.log('Payment verified and booking created successfully');
//               resolve({
//                 payment: response,
//                 booking: verifyResult.payload
//               });
//             } else {
//               throw new Error('Payment verification failed');
//             }

//           } catch (error) {
//             console.error('Payment verification failed:', error);
//             reject(error);
//           }
//         },

//         modal: {
//           ondismiss: function() {
//             reject(new Error('Payment cancelled by user'));
//           }
//         },

//         theme: {
//           color: "#3399cc",
//         },
//       };

//       if (!window.Razorpay) {
//         reject(new Error('Razorpay SDK not loaded'));
//         return;
//       }

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export default openRazorpay;









import { createPaymentOrder, verifyPayment } from "../features/cartbooking/cartBookingSlice";

const openRazorpay = (amount,currency,dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const razorPayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

      console.log("razorpaykey", razorPayKey);

      if (!razorPayKey) {
        reject(new Error('Razorpay key not configured. Please check your .env file'));
        return;
      }


      console.log('Creating Razorpay order...');
      const orderResult = await dispatch(createPaymentOrder(amount));

      if (!createPaymentOrder.fulfilled.match(orderResult)) {
        throw new Error('Failed to create Razorpay order');
      }

      const { orderId } = orderResult.payload;
      console.log('Razorpay order created:', { orderId });

  
      const options = {
        key: razorPayKey,
        amount: amount * 100,
        currency: currency,
        name: "Sunshine",
        description: "Cart Booking Payment",
        order_id: orderId,

        handler: async function (response) {
          try {
            console.log('Payment successful, now verifying and booking...');

  
            const verificationData = {
              order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyResult = await dispatch(verifyPayment(verificationData));

            if (verifyPayment.fulfilled.match(verifyResult)) {
              console.log('Payment verified and booking created successfully');
              resolve({

                // this line aad 1 line
                 paymentStatus: 'success',
                payment: response,
                booking: verifyResult.payload
              });
            } else {
              throw new Error('Payment verification failed');
            }

          } catch (error) {
            console.error('Payment verification failed:', error);
            reject(error);
          }
        },

        modal: {
          ondismiss: function() {
            reject(new Error('Payment cancelled by user'));
          }
        },

        theme: {
          color: "#3399cc",
        },
      };

      if (!window.Razorpay) {
        reject(new Error('Razorpay SDK not loaded'));
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      reject(error);
    }
  });
};

export default openRazorpay;
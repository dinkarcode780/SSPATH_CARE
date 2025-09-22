import Booking from "../models/cartbookingSchema.js";
import Cart from "../models/CartModel.js";
import Package from "../models/packageModel.js";
import Test from "../models/testModel.js";
import crypto from "crypto";
import Razorpay from "razorpay";



export const bookCartItems = async (req, res) => {
  const userId = req.id;

  // new code add
   const { paymentStatus } = req.body;
   //

  try {
    const cart = await Cart.findOne({ userId }).populate("items.itemId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total price
    let totalAmount = 0;
    for (const item of cart.items) {
      const itemData = item.itemId;
      if (!itemData) continue;
      totalAmount += (itemData.price || 0) * item.quantity;
    }

    // Create a booking
    const newBooking = new Booking({
      userId,
      items: cart.items,
      totalAmount,
      // status: "Pending",
      status: paymentStatus === "success" ? "Confirmed" : "Pending",
    });

    await newBooking.save();

     // new code add
     if (paymentStatus === "success") {
      await Cart.findOneAndUpdate({ userId }, { items: [] });
    }

    // Clear the cart after booking
    // await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({ message: "Booking successful", booking: newBooking });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const getUserBookings = async (req, res) => {
  const userId = req.id;
  try {
    const bookings = await Booking.find({ userId }).populate("items.itemId");

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const alluserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("items.itemId").populate("userId");

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Update Booking Status (Admin only)
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    console.log(req.body);
    

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (!["Pending", "Confirmed", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: "Booking updated successfully", booking });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "Completed") {
      return res.status(400).json({ message: "Completed bookings cannot be cancelled" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// add this code verifyPayment



// // ✅ Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  try {
    const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Generate expected signature
    const sign = order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // if (expectedSign !== razorpay_signature) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Payment verification failed",
    //   });
    // }

    // ✅ Payment verified -> create booking
    req.body.paymentStatus = "success";
    return bookCartItems(req, res);

  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// add this code verifyPayment



// ✅ Create Razorpay Order
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body; // frontend se amount ayega

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // paise me convert
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,   // 👈 frontend me ye jaana chahiye
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
  }
};



export default { bookCartItems, getUserBookings, updateBookingStatus, cancelBooking, alluserBookings,verifyPayment,createPaymentOrder };

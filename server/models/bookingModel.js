import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: false }, // Single package
    tests: [
        {
            testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: false }, // Multiple tests
        },
    ],
    status: { type: String, default: "Pending" },
    totalPrice: { type: Number }, // Calculated total price
    bookingDate: { type: Date, default: Date.now },
},{ strict: false });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

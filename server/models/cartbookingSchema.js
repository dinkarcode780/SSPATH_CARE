import mongoose from "mongoose";

const cartbookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  items: [
    {
      type: {
        type: String,
        enum: ["Package", "Test"],
        required: true,
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "items.type",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

const cartBooking = mongoose.model("cartBooking", cartbookingSchema);
export default cartBooking;

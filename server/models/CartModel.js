import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // User reference
    required: true,
  },
  items: [
    {
      type: {
        type: String,
        enum: ["Package", "Test"], // Package ya Test decide karega
        required: true,
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "items.type", // Package ya Test ka reference dynamically
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart

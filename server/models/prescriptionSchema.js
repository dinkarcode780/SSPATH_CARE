// prescriptionSchema.js
import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+@.+\..+/, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
  },
  file: {
    type: String,
    required: [true, "File is required"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  message: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
import mongoose from "mongoose";

const prescriptionReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: [true, "UserId  is required"],
  },
  userMobile: {
    type: String,
    required: true, // Mobile number should be required for searching
  },
  reportType: {
    type: String,
    required: [true, "Report type is required"],
    enum: ["Blood Test", "X-Ray", "MRI","CT Scan","Ultrasound", "Other"], 
  },
  doctorName: {
    type: String,
    required: [true, "Doctor name is required"],
  },
  reportFile: {
    type: String,
    required: [true, "Report file is required"],
  },
  comments: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentMode: {
    type: String,
  },
  paymentAmount: {
    type: Number,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

const PrescriptionReport = mongoose.model("PrescriptionReport", prescriptionReportSchema);

export default PrescriptionReport;

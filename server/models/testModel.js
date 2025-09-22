import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Test name is required"],
  },
  description: {
    type: String,
    // // required: [true, "Description is required"],
  },
  price: {
    type: Number,
    // // required: [true, "Price is required"],
  },
  discountPercent: {
    type: Number,
    // // required: [true, "Discount percent is required"],
  },
  sampleType: {
    type: String,
    // // required: [true, "Sample type is required"],
    enum: ["Blood", "Urine", "Stool", "Feces", "Oral Fluid", "Other"],
    default: "Blood",
  },
  parameter: {
    type: [Number],
    // // required: [true, "Parameters are required"],
  },
  duration: {
    type: String,
    // // required: [true, "Duration is required"],
  },
  finalPrice: {
    type: Number, // Save the calculated value in the database
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{ strict: false });

// Pre-save hook to calculate and save the finalPrice
// testSchema.pre("save", function (next) {
//   if (this.price && this.discountPercent) {
//     this.finalPrice = this.price - (this.price * (this.discountPercent / 100));
//   }
//   next();
// });

// Create the Test model
const Test = mongoose.model("Test", testSchema);

export default Test;

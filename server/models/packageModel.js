import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Package name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
            required: [true, "At least one test is required in the package"],
        },
    ],
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    discountPercent: {
        type: Number,
        required: [true, "Discount percent is required"],
    },
    finalPrice: {
        type: Number,
        required: [true, "Final price is required"],
    },
    parameters: {
        type: Number,
        required: [true, "Parameters are required"],
    },
});

// Pre-save hook to calculate `finalPrice`
// packageSchema.pre("save", function (next) {
//     if (this.price && this.discountPercent) {
//         this.finalPrice = this.price - (this.price * this.discountPercent) / 100;
//     }
//     next();
// });

const Package = mongoose.model("Package", packageSchema);

export default Package;

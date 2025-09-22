import mongoose from "mongoose";

const homeCollectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        mobileNumber: {
            type: String,
            required: [true, "Mobile number is required"],
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v);
                },
                message: "Invalid mobile number",
            },
        },
        city: {
            type: String,
            required: [true, "City is required"],
        },
        consent: {
            type: Boolean,
            required: [true, "Consent is required"],
        },
    },
    {
        timestamps: true,
    }
);

const HomeCollection = mongoose.model("HomeCollection", homeCollectionSchema);

export default HomeCollection;

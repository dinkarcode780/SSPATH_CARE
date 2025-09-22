import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin', // Reference to the Admin model
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        locality: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        address: {
            type: String, // Area or street
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        landmark: {
            type: String,
            default: '',
        },
        addressType: {
            type: String,
            enum: ['home', 'work'],
            default: 'home',
        },
    },
    { timestamps: true }
);

const Address = mongoose.model('Address', addressSchema);
export default Address;

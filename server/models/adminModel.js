import mongoose from 'mongoose';

const adminModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: '',
      unique: true,
    },
    mobileNumber: {
      type: String,
      default: '',
      unique: true,
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'user',
    },
    permissions: {
      type: [String],
      default: ['read', 'write', 'delete'],
    },
    lastLogin: { type: Date, default: null },
    addresses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address', 
    }],
    prescriptions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prescription',
    }],
    homeCollections: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HomeCollection',
    }],
    bookings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    }],
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpire: { type: Date, default: null },
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminModel);
export default Admin;

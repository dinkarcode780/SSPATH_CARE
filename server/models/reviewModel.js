import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientImage: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;

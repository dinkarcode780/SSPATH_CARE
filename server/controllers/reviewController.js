import Review from '../models/reviewModel.js';

export const createReview = async (req, res) => {
  try {
    const { clientName, message, companyName, rating } = req.body;
    const clientImage = req.file;
    // Validate required fields
    if (!clientName || !clientImage || !message || !companyName || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new review instance
    const newReview = new Review({
      clientName,
      clientImage: clientImage.buffer.toString('base64'),
      message,
      companyName,
      rating,
    });

    // Save the review to the database
    await newReview.save();

    return res.status(201).json({
      message: 'Review created successfully.',
      success: true,
      review: newReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    // Fetch all reviews
    const reviews = await Review.find();

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, message, companyName, rating } = req.body;
    const clientImage = req.file;

    // Check if review exists
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update review fields
    review.clientName = clientName;
    review.message = message;
    review.companyName = companyName;
    review.rating = rating;
    if (clientImage) {
      review.clientImage = clientImage.buffer.toString('base64');
    }

    // Save updated review to the database
    await review.save();

    return res.status(200).json({
      message: 'Review updated successfully.',
      success: true,
      review: review,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if review exists
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Delete review from database
    await Review.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Review deleted successfully.',
      success: true,
      review: review,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

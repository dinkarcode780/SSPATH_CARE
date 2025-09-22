import express from 'express';
import { createReview, getAllReviews, updateReview, deleteReview } from '../controllers/reviewController.js';
import multer from 'multer';

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Routes for reviews
router.post('/create', upload.single("clientImage"), createReview);
router.get('/all', getAllReviews);
router.put('/update/:id', upload.single("clientImage"), updateReview);
router.delete('/delete/:id', deleteReview);

export default router;

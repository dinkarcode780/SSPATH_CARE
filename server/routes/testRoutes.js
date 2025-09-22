// Routes
import express from 'express';
import { createTest, getAllTests, getTestById, updateTest, deleteTest } from '../controllers/testController.js';
import { testMiddleware } from '../middleware/testMiddleware.js';
const router = express.Router();

router.post('/',testMiddleware, createTest); // Create a new test
router.get('/',testMiddleware, getAllTests); // Get all tests
router.get('/fetchTestById/:id',testMiddleware, getTestById); // Get a single test by ID
router.put('/:id',testMiddleware,testMiddleware, updateTest); // Update a test by ID
router.delete('/:id',testMiddleware, deleteTest); // Delete a test by ID

export default router;
import express from 'express';
import { addAddress, getAddresses, updateAddress, deleteAddress } from '../controllers/addressController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// Route to add a new address
router.post('/create',isAuthenticated, addAddress);

// Route to get all addresses for a user
router.get('/addresses/:userId',isAuthenticated, getAddresses);

// Route to update an address
router.put('/update/:addressId', updateAddress);

// Route to delete an address
router.delete('/delete/:addressId', deleteAddress);

export default router;

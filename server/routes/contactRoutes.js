import express from 'express';
const router = express.Router();
import { createContact, getAllContacts, updateContact, deleteContact } from '../controllers/contactController.js';


// Routes for contacts
router.post('/create', createContact);
router.get('/all', getAllContacts);
router.put('/update/:id', updateContact);
router.delete('/delete/:id', deleteContact);

export default router;

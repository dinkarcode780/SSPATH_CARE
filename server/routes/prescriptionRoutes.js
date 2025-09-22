// prescriptionRoutes.js
import express from "express";
import upload from "../config/multerConfig.js";
import {
    uploadPrescription,
    getPrescriptions,
    updatePrescriptionStatus,
} from "../controllers/prescriptionController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Route to upload a prescription
router.post("/upload", isAuthenticated, uploadPrescription);

// Route to get all prescriptions for the logged-in user
router.get("/", isAuthenticated, getPrescriptions);

// Route to update the status of a prescription
router.put("/:id", isAuthenticated, updatePrescriptionStatus);

export default router;
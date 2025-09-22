import express from "express";
import upload from "../config/multerConfig.js";
import {
  uploadReport,
  getReports,
  getReportsByuserId,
  deleteReport,
  updateStatus,
  updateReport
} from "../controllers/prescriptionReportController.js";

const router = express.Router();

// Route to upload a prescription report
router.post("/upload",  uploadReport);

// Route to get all reports
router.get("/", getReports);

// Route to get reports for a specific prescription
router.get("/:mobileNumber", getReportsByuserId);

// Route to delete a report by ID
router.delete("/:id", deleteReport);

// Route to update the status of a report
router.put("/status/:id", updateStatus);

// Route to update a report by ID
router.put("/:id", updateReport);

// Route to download a report file
// router.get("/download/:reportId", downloadReport);


export default router;

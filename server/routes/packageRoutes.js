import express from "express";
import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";

const router = express.Router();

router.post("/", createPackage); // Create a new package
router.get("/", getAllPackages); // Get all packages
router.get("/:id", getPackageById); // Get a single package by ID
router.put("/:id", updatePackage); // Update a package by ID
router.delete("/:id", deletePackage); // Delete a package by ID

export default router;

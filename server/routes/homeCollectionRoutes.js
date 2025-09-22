import express from "express";
import {
    createHomeCollectionRequest,
    getHomeCollectionRequests,
} from "../controllers/homeCollectionController.js";

const router = express.Router();

// Create a new request
router.post("/create", createHomeCollectionRequest);

// Get all requests
router.get("/", getHomeCollectionRequests);

export default router;

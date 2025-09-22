import express from "express";
import { searchResults } from "../controllers/searchController.js";

const router = express.Router();

router.get("/search", searchResults);

export default router;

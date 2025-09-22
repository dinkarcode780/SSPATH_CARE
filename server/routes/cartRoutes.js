import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  getCart,
} from "../controllers/CartController.js";

// 🛒 Cart Routes
router.post("/add-to-cart",isAuthenticated, addToCart); // Add item to cart
router.put("/update-quantity",isAuthenticated, updateCartQuantity); // Update quantity
router.delete("/remove-from-cart",isAuthenticated, removeFromCart); // Remove item
router.get("/get-cart",isAuthenticated, getCart); // Get user's cart

export default router;

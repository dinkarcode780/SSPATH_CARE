import Cart from "../models/CartModel.js";
import Package from "../models/packageModel.js";
import Test from "../models/testModel.js";

// ✅ Add to Cart (Automatically Detects Package or Test)
export const addToCart = async (req, res) => {
  const userId = req.id;
  try {
    const {  itemId, quantity } = req.body;

    if (!userId || !itemId || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let type = null;
    const isPackage = await Package.findById(itemId);
    const isTest = await Test.findById(itemId);

    if (isPackage) {
      type = "Package";
    } else if (isTest) {
      type = "Test";
    } else {
      return res.status(404).json({ message: "Invalid item ID" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.itemId.toString() === itemId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ type, itemId, quantity });
    }

    await cart.save();
    await cart.populate("items.itemId"); 
    res.status(200).json({ message: "Item added to cart", cart });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Update Quantity (+ / -)
export const updateCartQuantity = async (req, res) => {
  const userId = req.id;
  try {
    const {  itemId, action } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.itemId.toString() === itemId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease") {
      item.quantity -= 1;
      if (item.quantity < 1) {
        cart.items = cart.items.filter((i) => i.itemId.toString() !== itemId);
      }
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Remove Item from Cart
export const removeFromCart = async (req, res) => {
  const userId = req.id;
  try {
    const {  itemId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.itemId.toString() !== itemId);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get User Cart
export const getCart = async (req, res) => {
  try {
    const  userId  = req.id;
    const cart = await Cart.findOne({ userId }).populate("items.itemId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export  default { addToCart, updateCartQuantity, removeFromCart, getCart };

import Package from "../models/packageModel.js";
import Test from "../models/testModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// Create a new package
export const createPackage = async (req, res, next) => {
  try {
    const { name, description, tests, price, discountPercent, parameters } = req.body;

    const finalPrice = price - (price * discountPercent) / 100; // Calculate final price

    const packageData = await Package.create({
      name,
      description,
      tests,
      price,
      discountPercent,
      finalPrice,
      parameters,
    });

    res.status(201).json({ success: true, data: packageData });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Get all packages
export const getAllPackages = async (req, res, next) => {
  try {
    const packages = await Package.find().populate("tests");
    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// Get a single package by ID
export const getPackageById = async (req, res, next) => {
  try {
    const packageData = await Package.findById(req.params.id).populate("tests");
    if (!packageData) {
      return next(new ErrorHandler("Package not found", 404));
    }
    res.status(200).json({ success: true, data: packageData });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// Update a package
export const updatePackage = async (req, res, next) => {
  try {
    const { name, description, tests, price, discountPercent, parameters } = req.body;
    console.log(req.body, "req.body");
    

     // Validate price and discountPercent
     if (isNaN(price) || isNaN(discountPercent)) {
        return next(new ErrorHandler("Price and Discount Percent must be valid numbers", 400));
      }

    const finalPrice = price - (price * discountPercent) / 100; 
    if (isNaN(finalPrice)) {
      return next(new ErrorHandler("Final price is not valid", 400));
    }

    const packageData = await Package.findByIdAndUpdate(
      req.params.id,
      { name, description, tests, price, discountPercent, finalPrice, parameters },
      { new: true, runValidators: true }
    );

    if (!packageData) {
      return next(new ErrorHandler("Package not found", 404));
    }

    res.status(200).json({ success: true, data: packageData });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// Delete a package
export const deletePackage = async (req, res, next) => {
  try {
    const packageData = await Package.findByIdAndDelete(req.params.id);
    if (!packageData) {
      return next(new ErrorHandler("Package not found", 404));
    }
    res.status(200).json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

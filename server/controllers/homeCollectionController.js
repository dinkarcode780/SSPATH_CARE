import HomeCollection from "../models/homeCollectionModel.js";

// @desc Create a new Home Collection Request
// @route POST /api/home-collection
// @access Public
export const createHomeCollectionRequest = async (req, res) => {
    try {
        const { name, mobileNumber, city, consent } = req.body;

        // Validate input
        if (!name || !mobileNumber || !city || consent === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create the request
        const homeCollection = await HomeCollection.create({
            name,
            mobileNumber,
            city,
            consent,
        });

        res.status(200).json({
            message: "Home collection request created successfully",
            data: homeCollection,
            success: true,
            status: 201,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Get all Home Collection Requests
// @route GET /api/home-collection
// @access Public
export const getHomeCollectionRequests = async (req, res) => {
    try {
        const requests = await HomeCollection.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

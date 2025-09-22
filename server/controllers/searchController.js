import Test from "../models/testModel.js";
import Package from "../models/packageModel.js";

export const searchResults = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const testResults = await Test.find({ name: { $regex: query, $options: "i" } });
        const packageResults = await Package.find({ name: { $regex: query, $options: "i" } });

        res.json({ tests: testResults, packages: packageResults });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

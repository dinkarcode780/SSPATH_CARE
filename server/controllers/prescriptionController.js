// prescriptionController.js
import Prescription from "../models/prescriptionSchema.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Admin from "../models/adminModel.js";
import sendEmail from "../utils/emailService.js";
import imagekit from "../config/imageKit.js";




export const uploadPrescription = async (req, res) => {
    try {
        const userId = req.id; // Ensure req.id is set by auth middleware
        const { message, city } = req.body;

        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.files.file;
        console.log("Uploaded File:", file);

        // Validate file
        const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
        const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

        if (file.size > MAX_FILE_SIZE) {
            return res.status(400).json({ message: "File size exceeds 25MB limit" });
        }

        if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
            return res.status(400).json({ message: "Invalid file type. Only JPEG, PNG, and GIF are allowed" });
        }

        let prescriptionImageUrl = "";

        try {
            const uploadedFile = await imagekit.upload({
                file: file.data,
                fileName: file.name,
                folder: "prescriptions",
            });

            console.log("ImageKit Upload Success:", uploadedFile);
            prescriptionImageUrl = uploadedFile.url;
        } catch (error) {
            console.error("ImageKit Upload Error:", error);
            return res.status(500).json({ message: "Failed to upload file to ImageKit" });
        }

        // Find user
        const user = await Admin.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Save to database
        const prescription = new Prescription({
            userId,
            name: `${user.firstName} ${user.lastName}`,
            city,
            email: user.email,
            phone: user.mobileNumber,
            file: prescriptionImageUrl,
            message,
        });

        try {
            await prescription.save();
        } catch (error) {
            console.error("Database Save Error:", error);
            return res.status(500).json({ message: "Failed to save prescription" });
        }

        // Send emails asynchronously
        try {
            await sendEmail({
                to: "shrivasprashant41@gmail.com",
                subject: "New Prescription Uploaded",
                html: `
                    <h2>Prescription Uploaded</h2>
                    <p><b>Name:</b> ${user.firstName} ${user.lastName}</p>
                    <p><b>City:</b> ${city}</p>
                    <p><b>Email:</b> ${user.email}</p>
                    <p><b>Phone:</b> ${user.mobileNumber}</p>
                    <p><b>File:</b> ${file.name}</p>
                    <p>Check the prescription in the admin panel.</p>
                `,
                attachments: [
                    {
                        filename: file.name,
                        path: prescriptionImageUrl, // Attach ImageKit URL
                    },
                ],
            });

            await sendEmail({
                to: user.email,
                subject: "Prescription Received",
                html: `
                    <h2>Thank You for Uploading Your Prescription</h2>
                    <p>Dear ${user.firstName} ${user.lastName},</p>
                    <p>Your prescription (${file.name}) has been uploaded successfully. Our team will contact you soon.</p>
                `,
            });
        } catch (error) {
            console.error("Email Error:", error);
        }

        res.status(201).json({
            message: "Prescription uploaded successfully.",
            data: prescription,
        });
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ message: error.message });
    }
};


export const getPrescriptions = async (req, res, next) => {
    try {
        const prescriptions = await Prescription.find();
        res.status(200).json({ success: true, data: prescriptions });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
        console.log(error);
    }
};

export const updatePrescriptionStatus = async (req, res, next) => {
    try {
        const { status, message } = req.body;
        const { id } = req.params;

        const prescription = await Prescription.findById(id);

        if (!prescription) {
            return next(new ErrorHandler("Prescription not found", 404));
        }

        prescription.status = status || prescription.status;
        prescription.message = message || "";
        await prescription.save();

        res.status(200).json({
            success: true,
            message: "Prescription status updated successfully",
            data: prescription,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
        console.log(error);
    }
};
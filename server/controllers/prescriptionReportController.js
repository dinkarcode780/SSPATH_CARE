import PrescriptionReport from "../models/prescriptionReportSchema.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import path from "path";
import fs from "fs";
import Admin from "../models/adminModel.js";
import imagekit from "../config/imageKit.js";


// Upload a prescription report
export const uploadReport = async (req, res, next) => {
    try {
        const { userId, reportType, doctorName, comments,paymentMode,paymentAmount,paymentDate } = req.body;
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

        let reportImageUrl = "";

        try {
            const uploadedFile = await imagekit.upload({
                file: file.data,
                fileName: file.name,
            });
            reportImageUrl = uploadedFile.url;
        } catch (error) {
            console.log(error);
        }

        // userId ke base par mobileNumber nikalna
        const admin = await Admin.findOne({ _id: userId });

        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        const userMobile = admin.mobileNumber; // User ka mobile number extract karna

        const report = new PrescriptionReport({
            userId,
            reportType,
            doctorName,
            reportFile: reportImageUrl,
            comments,
            userMobile,
            paymentMode,
            paymentAmount,
            paymentDate
        });

        await report.save();

        res.status(201).json({
            message: "Prescription report uploaded successfully.",
            data: report,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
        console.log(error);
    }
};

export const updateReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { reportType, doctorName, comments, paymentMode, paymentAmount, paymentDate } = req.body;

        const report = await PrescriptionReport.findById(id);
        if (!report) {
            return next(new ErrorHandler("Report not found", 404));
        }

        report.reportType = reportType;
        report.doctorName = doctorName;
        report.comments = comments;
        report.paymentMode = paymentMode;
        report.paymentAmount = paymentAmount;
        report.paymentDate = paymentDate;

        await report.save();

        res.status(200).json({ success: true, data: report });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
        console.log(error);
    }
};

// Fetch all prescription reports
export const getReports = async (req, res, next) => {
    try {
        const reports = await PrescriptionReport.find().populate("userId");
        res.status(200).json({ success: true, data: reports });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
        console.log(error);
    }
};




export const getReportsByuserId = async (req, res, next) => {
    try {
        const { mobileNumber } = req.params;
        console.log("Searching reports for mobile number:", mobileNumber);

        // Find reports by userMobile instead of userId
        const reports = await PrescriptionReport.find({ userMobile: mobileNumber });

        res.status(200).json({ success: true, data: reports });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
        console.log(error);
    }
};


// Delete a prescription report
export const deleteReport = async (req, res, next) => {
    try {
        const { id } = req.params;

        const report = await PrescriptionReport.findById(id);
        if (!report) {
            return next(new ErrorHandler("Report not found", 404));
        }

        // Delete the file from the uploads directory
        const filePath = path.join("uploads", report.reportFile);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await report.deleteOne();

        res.status(200).json({ success: true, message: "Report deleted successfully." });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
        console.log(error);
    }
};

export const updateStatus = async (req, res, next) => {
    console.log(req.body);
    
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log(status);
        console.log(id);
        
        

        const report = await PrescriptionReport.findById(id);
        if (!report) {
            return next(new ErrorHandler("Report not found", 404));
        }

        report.status = status;
        await report.save();

        res.status(200).json({ success: true, message: "Report status updated successfully." });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
        console.log(error);
    }
};

// Download a report
// export const downloadReport = async (req, res, next) => {
//     try {
//         const { fileName } = req.params;

//         const filePath = path.join("uploads", fileName);

//         if (!fs.existsSync(filePath)) {
//             return next(new ErrorHandler("File not found", 404));
//         }

//         res.download(filePath, fileName, (err) => {
//             if (err) {
//                 next(new ErrorHandler("Error while downloading the file", 500));
//                 console.log(err);
//             }
//         });
//     } catch (error) {
//         next(new ErrorHandler(error.message, 500));
//         console.log(error);
//     }
// };



import Booking from "../models/bookingModel.js";
import Package from "../models/packageModel.js";
import Test from "../models/testModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Admin from "../models/adminModel.js";


// Create a new booking
// export const createBooking = async (req, res, next) => {
//     const userId = req.id;
//     try {
//         const { userId, packageId, tests } = req.body;

//         if (!userId || !packageId || !Array.isArray(tests)) {
//             return res.status(400).json({ message: "Invalid data provided" });
//         }

//         // Transform tests to include only test IDs
//         const transformedTests = tests.map((testId) => ({ testId }));

//         // Fetch package data
//         const packageData = await Package.findById(packageId);
//         if (!packageData) {
//             return res.status(404).json({ message: "Package not found" });
//         }

//         // Fetch test prices
//         const testIds = tests.map((testId) => testId); // Extract test IDs from request
//         const testData = await Test.find({ _id: { $in: testIds } }).select("finalPrice");
//         const totalTestPrice = testData.reduce((total, test) => total + test.finalPrice, 0);

//         // Calculate total price
//         const totalPrice = packageData.finalPrice + totalTestPrice;

//         // Create booking
//         const booking = new Booking({
//             userId,
//             packageId,
//             tests: transformedTests,
//             totalPrice,
//         });

//         await booking.save();
//         res.status(201).json({ message: "Booking created successfully", data: booking });
//     } catch (error) {
//         next(new ErrorHandler(error.message, 500));
//     }
// };

export const createBooking = async (req, res, next) => {
    try {
        const Id = req.id;
        const user = await Admin.findById(Id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { packageId, tests, userId: bodyUserId } = req.body;
        const userId = user.role === "admin" ? bodyUserId : Id; // Admin req.body se lega, user req.id se lega

        if (!userId || !packageId || !Array.isArray(tests)) {
            return res.status(400).json({ message: "Invalid data provided" });
        }

        // Transform tests to include only test IDs
        const transformedTests = tests.map((testId) => ({ testId }));

        // Fetch package data
        
            const packageData = await Package.findById(packageId);
        //     if (!packageData) {
        //         return res.status(404).json({ message: "Package not found" });
        // }

        // Fetch test prices
        const testData = await Test.find({ _id: { $in: tests } }).select("finalPrice");
        const totalTestPrice = testData.reduce((total, test) => total + test.finalPrice, 0);

        // Calculate total price
        const totalPrice = packageData && packageData.finalPrice !== undefined ? packageData.finalPrice : 0 + totalTestPrice;

        // Create booking
        const booking = new Booking({
            userId,
            packageId,
            tests: transformedTests,
            totalPrice,
        });

        await booking.save();
        res.status(201).json({success:true, message: "Booking created successfully", data: booking });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};



// Get all bookings
export const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate("userId", "firstName lastName email mobileNumber") // Populate user details
            .populate({
                path: "packageId", // Populate package details
                populate: {
                    path: "tests.testId", // Populate tests inside the package
                    select: "name finalPrice description", // Include additional fields
                },
            })
            .populate({
                path: "tests.testId", // Populate tests in the booking directly
                select: "name finalPrice description",
            });

        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};


// Get a single booking by ID
// export const getBookingById = async (req, res, next) => {
//     const userId = req.id;
//     console.log("mera id",userId);

//     try {
//         const booking = await Booking.find(
//             { userId }
//         )
//             .populate("userId", "firstName lastName email mobileNumber") // Populate user details
//             .populate({
//                 path: "packageId", // Populate package details
//                 select: "name finalPrice tests",
//                 populate: {
//                     path: "tests.testId", // Populate tests inside the package
//                     select: "name finalPrice description",
//                 },
//             })
//             .populate({
//                 path: "tests.testId", // Populate tests in the booking directly
//                 select: "name finalPrice description",
//             });

//             console.log("book",booking)
//         if (!booking) {
//             return next(new ErrorHandler("Booking not found", 404));
//         }

//         res.status(200).json({ success: true,message:"Fetch booking successfully", data: booking });
//     } catch (error) {
//         next(new ErrorHandler(error.message, 500));
//     }
// };



export const getBookingById = async (req, res, next) => {
    const userId = req.id;
    console.log("mera id", userId);

    try {
        const booking = await Booking.find({ userId })
            .populate("userId", "firstName lastName email mobileNumber") 
            .populate("packageId", "name finalPrice tests") 
            .populate("tests.testId", "name finalPrice description"); 

            console.log("POPULATED:", JSON.stringify(booking, null, 2));


        

        if (!booking || booking.length === 0) {
            return next(new ErrorHandler("Booking not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Fetch booking successfully",
            data: booking,
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};



// export const getBookingById = async (req, res, next) => {
//   const userId = req.params.id || req.id;
//   const booking = await Booking.find({ userId })
//     .populate("userId", "firstName lastName email mobileNumber")
//     .populate({ path: "packageId", populate: { path: "tests.testId", select: "name finalPrice description" } })
//     .populate({ path: "tests.testId", select: "name finalPrice description" });

//   if (!booking || booking.length === 0) {
//     return res.status(200).json({ success: true, message: "No bookings found", data: [] });
//   }
//   res.status(200).json({ success: true, message: "Fetch booking successfully", data: booking });
// };





// Delete a booking
export const deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return next(new ErrorHandler("Booking not found", 404));
        }
        res.status(200).json({ success: true, message: "Booking deleted successfully" });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};

// export const updateBooking = async (req, res, next) => {
//     console.log(req.body);
//     console.log(req.params.id);

//     try {
//         const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         if (!booking) {
//             return next(new ErrorHandler("Booking not found", 404));
//         }
//         res.status(200).json({ success: true, data: booking });
//     } catch (error) {
//         next(new ErrorHandler(error.message, 500));
//     }
// };

export const updateBooking = async (req, res, next) => {
    try {
        let { packageId, tests,status } = req.body;

        // Find the existing booking
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return next(new ErrorHandler("Booking not found", 404));
        }

        let totalPrice = booking.totalPrice; // Default to current totalPrice

        // Update tests format if provided
        if (tests && Array.isArray(tests)) {
            req.body.tests = tests.map((testId) => ({ testId }));

            // Fetch test prices
            const testData = await Test.find({ _id: { $in: tests } }).select("finalPrice");
            const totalTestPrice = testData.reduce((total, test) => total + test.finalPrice, 0);

            totalPrice = totalTestPrice; // Start with total test price
        }

        // Fetch package price if packageId is updated
        if (packageId) {
            const packageData = await Package.findById(packageId);
            if (!packageData) {
                return next(new ErrorHandler("Package not found", 404));
            }
            totalPrice += packageData.finalPrice; // Add package price
        }

        // Include recalculated totalPrice in update
        req.body.status = status;
        req.body.totalPrice = totalPrice;


        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: updatedBooking });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};

export const changeStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        req.body.status = status;
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json({ success: true, data: updatedBooking });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};



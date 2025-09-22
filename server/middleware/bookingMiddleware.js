import Booking from "../models/bookingModel.js";


// export const bookingMiddleware = async (req, res) => {
//   try {
//     const data = req.body;
//     const { bookingId } = req.params;

//     let booking;

//     if (bookingId) {
     
//       booking = await Booking.findByIdAndUpdate(
//         bookingId,
//         { $set: data },
//         { new: true, runValidators: false, strict: false }
//       );

//       if (!booking) {
//         return res.status(404).json({ success: false, message: "Booking not found" });
//       }
//     } else {
      
//       booking = new Booking(data);

  
//       booking.$__.strictMode = false;
//       await booking.save();
//     }

  
//     return res.status(200).json({
//       success: true,
//       message: bookingId ? "Booking updated successfully" : "Booking created successfully",
//       data: { ...data, ...booking.toObject() },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };




export const bookingMiddleware = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const allowedFields = [
      
      "userId",
      "packageId",
      "tests",
      "status",
      "totalPrice",
      "bookingDate",

      // Appointment / new fields
      "LabID",
      "PatientID",
      "Username",
      "SelectedTest",
      "SelectedProfile",
      "SelectedPopularTest",
      "EnteredTest",
      "AppointmentDate",
      "AppointmentAddress",
      "RefDocID",
      "RefDocName",
      "PatientName",
      "IsRefering",
      "Age",
      "Gender",
      "Pincode",
      "CollectionCenterID",
      "AffiliationID",
      "IsHomeCollection",
      "DeviceType",
      "Task",
      "Prescription",
      "PrescriptionTwo",
      "PrescriptionThree",
      "PrescriptionFour"
    ];

   
    let data = {};
    for (let key of allowedFields) {
      if (req.body[key] !== undefined) {
        data[key] = req.body[key];
      }
    }

    if (req.method === "POST") {
      const booking = new Booking(data);
      await booking.save();

      return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking,
      });
    }

    if (req.method === "PUT" || req.method === "PATCH") {
      if (!bookingId) {
        return res.status(400).json({ success: false, message: "Booking ID required" });
      }

      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { $set: data },
        { new: true, runValidators: true }
      );

      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        data: booking,
      });
    }

    if (req.method === "GET") {
      if (bookingId) {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
          return res.status(404).json({ success: false, message: "Booking not found" });
        }
        return res.status(200).json({
          success: true,
          message: "Booking fetched successfully",
          data: booking,
        });
      }

      const allBookings = await Booking.find();
      return res.status(200).json({
        success: true,
        message: "All bookings fetched successfully",
        data: allBookings,
      });
    }

    if (req.method === "DELETE") {
      if (!bookingId) {
        return res.status(400).json({ success: false, message: "Booking ID required" });
      }

      const booking = await Booking.findByIdAndDelete(bookingId);
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Booking deleted successfully",
        data: booking,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Unsupported request method",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

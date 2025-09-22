import Test from "../models/testModel.js";

// export const testMiddleware = async (req, res) => {
//   try {
//     const data = req.body;

//     if (data.price && data.discountPercent) {
//       data.finalPrice =
//         data.price - (data.price * data.discountPercent) / 100;
//     }

//     const newTest = await Test.create(data);

//     return res.status(201).json({
//       message: "Data saved successfully",
//       data: newTest,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: error.message });
//   }
// };







// export const testMiddleware = async (req, res) => {
//   try {

//     if (req.method === "POST") {
//       const data = req.body;

//       if (data.price && data.discountPercent) {
//         data.finalPrice =
//           data.price - (data.price * data.discountPercent) / 100;
//       }

//       const newTest = await Test.create(data);

//       return res.status(201).json({
//         message: "Data saved successfully",
//         data: newTest,
//         success: true,
//       });
//     }

//     if (req.method === "PUT" || req.method === "PATCH") {
//       const { id } = req.params; 
//       let updatedData = req.body;

//       if (updatedData.price && updatedData.discountPercent) {
//         updatedData.finalPrice =
//           updatedData.price -
//           (updatedData.price * updatedData.discountPercent) / 100;
//       }

//       const updatedTest = await Test.findByIdAndUpdate(id, updatedData, {
//         new: true,
//       });

//       if (!updatedTest) {
//         return res.status(404).json({
//           message: "Test not found",
//           success: false,
//         });
//       }

//       return res.status(200).json({
//         message: "Test updated successfully",
//         data: updatedTest,
//         success: true,
//       });
//     }

//     if (req.method === "GET") {
//       const { id } = req.params;

//       const allData = await Test.find({
//         $or: [
//           { _id: id }, 
//           { UserFID: id },
//         ],
//       });

//       return res.status(200).json({
//         message: "Data fetched successfully",
//         success: true,
//         data: allData,
//       });
//     }

//     return res.status(400).json({
//       message: "Unsupported request method",
//       success: false,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };





// export const testMiddleware = async (req, res) => {
//   try {
//     const data = req.body;
//     const { id } = req.params;
//     const { action } = req.query; // ?action=create / update / delete

//     // Agar price aur discountPercent aaye to finalPrice nikalo
//     if (data.price && data.discountPercent) {
//       data.finalPrice = data.price - (data.price * data.discountPercent) / 100;
//     }

//     let test;

//     // 🔹 DELETE
//     if (action === "delete" && id) {
//       test = await Test.findByIdAndDelete(id);
//       if (!test) {
//         return res.status(404).json({ success: false, message: "Test not found" });
//       }
//       return res.status(200).json({
//         success: true,
//         message: "Data deleted successfully",
//         data: test,
//       });
//     }

//     // 🔹 UPDATE
//     if (action === "update" && id) {
//       test = await Test.findById(id);
//       if (!test) {
//         return res.status(404).json({ success: false, message: "Test not found" });
//       }

//       Object.assign(test, data); // schema ke fields + extra fields dono update honge
//       await test.save();

//       return res.status(200).json({
//         success: true,
//         message: "Data updated successfully",
//         data: test,
//       });
//     }

//     // 🔹 CREATE (default)
//     test = await Test.create(data);

//     return res.status(201).json({
//       success: true,
//       message: "Data saved successfully",
//       data: test,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };



export const testMiddleware = async (req, res) => {
  try {
    
    const allowedFields = [
      "name",
      "description",
      "price",
      "discountPercent",
      "sampleType",
      "parameter",
      "duration",
      "finalPrice",
      "createdAt",

      "UserFID",
      "LabID",
      "FromDate",
      "ToDate",
      "LabCode",
      "PatientName",
      "UserType",
      "EntityId",
      "EntityTypeId",
    ];

    const filteredData = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredData[key] = req.body[key];
      }
    });

    if (req.method === "POST") {
      if (filteredData.price && filteredData.discountPercent) {
        filteredData.finalPrice =
          filteredData.price - (filteredData.price * filteredData.discountPercent) / 100;
      }

      const newTest = await Test.create(filteredData);
      return res.status(201).json({
        message: "Data saved successfully",
        data: newTest,
        success: true,
      });
    }

    if (req.method === "PUT" || req.method === "PATCH") {
      const { id } = req.params;

      if (filteredData.price && filteredData.discountPercent) {
        filteredData.finalPrice =
          filteredData.price - (filteredData.price * filteredData.discountPercent) / 100;
      }

      const updatedTest = await Test.findByIdAndUpdate(id, filteredData, { new: true });
      if (!updatedTest) {
        return res.status(404).json({ message: "Test not found", success: false });
      }

      return res.status(200).json({
        message: "Test updated successfully",
        data: updatedTest,
        success: true,
      });
    }

    if (req.method === "GET") {
      const { id } = req.params;
      const allData = await Test.find({
        $or: [{ _id: id }, { UserFID: id }],
      });
      return res.status(200).json({
        message: "Data fetched successfully",
        success: true,
        data: allData,
      });
    }

    return res.status(400).json({
      message: "Unsupported request method",
      success: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

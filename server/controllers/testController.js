import ErrorHandler from '../utils/ErrorHandler.js';
import Test from '../models/testModel.js';


// export const createTest = async (req, res, next) => {
//     try {
//         const test = await Test.create(req.body);
//         res.status(201).json({ success: true, data: test });
//     } catch (error) {
//         next(new ErrorHandler(error.message, 400));
//     }
// };

export const createTest = async (req, res) => {
    try {
      const { name, description, price, discountPercent, sampleType, parameter, duration } = req.body;
  
      const finalPrice = price - (price * discountPercent) / 100; // Calculate final price
      const newTest = await Test.create({
        name,
        description,
        price,
        discountPercent,
        finalPrice,
        sampleType,
        parameter,
        duration,
      });
  
      res.status(201).json(newTest);
    } catch (err) {
      res.status(400).json({ message: err.message, errName: err.name });
    }
  };
  

export const getAllTests = async (req, res, next) => {
    try {
        const tests = await Test.find();
        res.status(200).json({ success: true, data: tests });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};

export const getTestById = async (req, res, next) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return next(new ErrorHandler('Test not found', 404));
        }
        res.status(200).json({ success: true, data: test });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};

// export const updateTest = async (req, res, next) => {
//     try {
//         const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         if (!test) {
//             return next(new ErrorHandler('Test not found', 404));
//         }
//         res.status(200).json({ success: true, data: test });
//     } catch (error) {
//         next(new ErrorHandler(error.message, 500));
//     }
// };

export const updateTest = async (req, res, next) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return next(new ErrorHandler("Test not found", 404));
        }

        // Update the fields with the request body
        Object.assign(test, req.body);

        // Save the document (this will trigger the pre-save hook)
        await test.save();

        res.status(200).json({ success: true,message:"Test Updated successfully", data: test });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};


export const deleteTest = async (req, res, next) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id);
        if (!test) {
            return next(new ErrorHandler('Test not found', 404));
        }
        res.status(200).json({ success: true, message: 'Test deleted successfully' });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};

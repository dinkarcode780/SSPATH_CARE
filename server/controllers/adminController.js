import Admin from '../models/adminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// export const register = async (req, res) => {
//     try {
//         const { firstName,lastName, password,confirmPassword, email, phone } = req.body;
//         if (!firstName|| !lastName || !password || !confirmPassword || !phone || !email) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const existingAdmin = await Admin.findOne({ email });
//         if (existingAdmin) {
//             return res.status(400).json({ message: 'Admin already exists. Try a different email.' });
//         }

//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: 'Passwords do not match' });
//         }


//         const hashedPassword = await bcrypt.hash(password, 10);
//         const profilePhoto = `https://avatar.iran.liara.run/public/boy?email=${email}`;

//         const newAdmin = new Admin({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             mobileNumber: phone,
//             profilePhoto,
//         });

//         await newAdmin.save();

//         return res.status(201).json({
//             message: 'Account created successfully.',
//             success: true,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

export const register = async (req, res) => {
    try {
        const { firstName, lastName, password, confirmPassword, email, phone } = req.body;
        if (!firstName || !lastName || !password || !confirmPassword || !phone || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists. Try a different email.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const profilePhoto = `https://avatar.iran.liara.run/public/boy?email=${email}`;

        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNumber: phone,
            profilePhoto,
        });

        await newAdmin.save();

        // Generate Token
        const token = jwt.sign({ userId: newAdmin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(201).json({
            message: 'Account created successfully.',
            success: true,
            token,
            admin: {
                _id: newAdmin._id,
                email: newAdmin.email,
                name: `${newAdmin.firstName} ${newAdmin.lastName}`,
                mobileNumber: newAdmin.mobileNumber,
                profilePhoto: newAdmin.profilePhoto,
                role: newAdmin.role,
            }
           
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const admin = await Admin.findOne({ email });
//         if (!admin) {
//             return res.status(400).json({
//                 message: 'Incorrect email or password',
//                 success: false,
//             });
//         }

//         const isPasswordMatch = await bcrypt.compare(password, admin.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: 'Incorrect email or password',
//                 success: false,
//             });
//         }

//         // Update lastLogin timestamp
//         admin.lastLogin = new Date();
//         await admin.save();

//         const tokenData = {
//             userId: admin._id,
//         };

//         const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
//             expiresIn: '1d',
//         });
//         const options = {
//             maxAge: 1 * 24 * 60 * 60 * 1000,
//             httpOnly: true,
//             sameSite: 'none',
//             secure: false,
//         };
//         res.cookie('token', token, options);
//         return res.status(200).json({
//             _id: admin._id,
//             token: token,
//             email: admin.email,
//             name: admin.firstName + ' ' + admin.lastName,
//             mobileNumber: admin.mobileNumber,
//             profilePhoto: admin.profilePhoto,
//             role: admin.role,
//             firstName: admin.firstName,
//             lastName: admin.lastName,
//             success: true,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Incorrect email or password', success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Incorrect email or password', success: false });
        }

        admin.lastLogin = new Date();
        await admin.save();

        const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        res.cookie('token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: false,
        });

        return res.status(200).json({
            _id: admin._id,
            token,
            email: admin.email,
            name: `${admin.firstName} ${admin.lastName}`,
            mobileNumber: admin.mobileNumber,
            profilePhoto: admin.profilePhoto,
            role: admin.role,
            firstName: admin.firstName,
            lastName: admin.lastName,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
export const logout = (req, res) => {
    try {
        return res.status(200).cookie('token', '', { maxAge: 0 }).json({
            message: 'Logged out successfully.',
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select('-password'); // Excluding the password field
        res.status(200).json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getTodayLogins = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Start of tomorrow

        const count = await Admin.countDocuments({
            lastLogin: { $gte: today, $lt: tomorrow },
        });

        res.status(200).json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getTodayLoggedInUsers = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Start of tomorrow

        // Fetch users logged in today
        const users = await Admin.find({
            lastLogin: { $gte: today, $lt: tomorrow },
        }).select('-password'); // Exclude the password field for security

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const searchUsers =  async (req, res) => {
    const { q } = req.query; // Query parameter
    try {
      const users = await Admin.find({
        $or: [
          { name: { $regex: q, $options: 'i' } }, // Case-insensitive name search
          { email: { $regex: q, $options: 'i' } },
          { mobile: { $regex: q, $options: 'i' } },
        ],
      }).select('_id name email mobile'); // Fetch only relevant fields
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        admin.resetPasswordToken = resetToken;
        admin.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
        await admin.save();

        // Send email with token
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: admin.email,
            subject: 'Password Reset Request',
            text: `Use this token to reset your password: ${resetToken}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Reset token sent to email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        const admin = await Admin.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }, // Check if token is valid
        });

        if (!admin) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(newPassword, salt);
        admin.resetPasswordToken = undefined; // Clear token
        admin.resetPasswordExpire = undefined;
        await admin.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



// Change Password
export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const admin = await Admin.findById(req.id);

        const isPasswordMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateAdmin = async (req, res) => {
    try {
        const { firstName, lastName, mobileNumber } = req.body;
        const admin = await Admin.findByIdAndUpdate(req.id, { firstName, lastName, mobileNumber }, { new: true });

        res.status(200).json({ message: 'Admin details updated', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteAdmin = async (req, res) => {
    const userId = req.params.id;
    
    try {
        await Admin.findByIdAndDelete(userId);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
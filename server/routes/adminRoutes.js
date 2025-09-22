import express from 'express';
import { getAllAdmins, login, logout, register, getTodayLoggedInUsers ,searchUsers,resetPassword ,changePassword,updateAdmin,deleteAdmin,forgotPassword} from '../controllers/adminController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/register', register);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated, logout);
router.get('/all', getAllAdmins);
router.get('/logins/today', isAuthenticated, getTodayLoggedInUsers);
router.get('/search', isAuthenticated, searchUsers);
router.put('/update', isAuthenticated, updateAdmin);
// router.put('/reset-password/:id', isAuthenticated, resetPassword);
router.put('/change-password', isAuthenticated, changePassword);
router.delete('/delete/:id', isAuthenticated, deleteAdmin);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password',  resetPassword);


export default router;

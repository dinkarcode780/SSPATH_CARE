import express from 'express';
const router = express.Router();
import cityController from '../controllers/cityController.js';

router.post('/cities', cityController.createCity);
router.get('/cities', cityController.getAllCities);
router.get('/cities/:id', cityController.getCityById);
router.put('/cities/:id', cityController.updateCity);
router.delete('/cities/:id', cityController.deleteCity);

export default router;
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabase from './config/database.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import homeCollectionRoutes from "./routes/homeCollectionRoutes.js";
import PrescriptionReport from './routes/prescriptionReportRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import testRoutes from './routes/testRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import cartRoutes from "./routes/cartRoutes.js";
import cartbookingRoutes from "./routes/cartbookingRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import CityRoutes from "./routes/cityRoutes.js";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import ErrorHandler from './utils/ErrorHandler.js';
import { generatedError } from './middleware/error.js';
import fileUpload from 'express-fileupload';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable file uploads
app.use(fileUpload());

// Logger
app.use(logger('tiny'));

// ✅ CORS setup
const allowedOrigins = [
  'https://soft.sspathcare.com',  // backend domain
  'https://sspathcaare.com',      // frontend domain (double 'a')
  'https://sspathcare.com',       // in case you also use this spelling
  'http://localhost:3000',        // local React dev
  'http://127.0.0.1:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight requests

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/uploads', express.static('uploads'));

// Cookie parser
app.use(cookieParser());

// Routes
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/prescription', prescriptionRoutes);
app.use('/api/v1/home-collection', homeCollectionRoutes);
app.use('/api/v1/prescription-reports', PrescriptionReport);
app.use('/api/v1/address', addressRoutes);
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/package', packageRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/cart-booking', cartbookingRoutes);
app.use('/api/v1/', searchRoutes);
app.use('/api/v1/city', CityRoutes);

// Error handling
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});
app.use(generatedError);

// Connect to the database and start the server
connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server listening at port ${port}`);
    });
  })
  .catch(error => {
    console.error('❌ Failed to connect to the database:', error);
  });

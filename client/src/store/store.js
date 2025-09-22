import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/AuthSlice';
import userSlice from './slice/userSlice';
import prescriptionSlice from '../features/prescription/prescriptionSlice';
import homeCollectionSlice from '../features/homecollection/homecollectionSlice';
import adminPrescriptionSlice from '../features/adminPrescription/adminPrescriptionSlice';
import contactFormSlice from '../features/contact/contactFormSlice';
import PrescriptionReports from '../features/report/prescriptionReportSlice';
import addressReducer from '../features/address/addressSlice';
import testReducer from '../features/test/testSlice';
import packageReducer from '../features/package/packageSlice';
import bookingReducer from '../features/booking/bookingSlice';
import cartReducer from "../features/cart/cartSlice";
import cartBookingReducer from "../features/cartbooking/cartBookingSlice"; 
import serchReducer from '../features/search/searchSlice';
import citiesReducer from "../features/city/citiesSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        prescription: prescriptionSlice,
        homeCollection: homeCollectionSlice,
        adminPrescriptions: adminPrescriptionSlice,
        contactForm: contactFormSlice,
        prescriptionReports: PrescriptionReports,
        address: addressReducer,
        tests: testReducer,
        packages: packageReducer,
        booking: bookingReducer,
        cart: cartReducer,
        cartBooking: cartBookingReducer,
        search: serchReducer,
        cities: citiesReducer
    },
});

export default store;

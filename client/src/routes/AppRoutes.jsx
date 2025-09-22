import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';



// Lazy-loaded components
const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Orders = lazy(() => import('../pages/Dashboard/Orders'));
const Addresses = lazy(() => import('../pages/Dashboard/Addresses'));
const AccountDetails = lazy(() => import('../pages/Dashboard/AccountDetails'));
const NotFound = lazy(() => import('../pages/NoteFound/NotFound'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const PackagesSection = lazy(() => import('../pages/package/PackagesSection'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const ContactPage = lazy(() => import('../pages/contact/ContactPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const SignUpPage = lazy(() => import('../pages/register/SignUpPage'));
const Logout = lazy(() => import('../pages/logout/Logout'));
const Profile = lazy(() => import('../pages/Dashboard/Profile'));
const UploadPrescription = lazy(() => import('../pages/UploadPrescription'));
const ReportDownload = lazy(() => import('../pages/ReportDownload'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('../pages/TermsOfUse'));
const Disclaimer = lazy(() => import('../pages/Disclaimer'));
const FranchisLayout = lazy(() => import('../admin/FranchisLayout'));
const AffiliatePanel = lazy(() => import('../admin/AffiliatePanel'));
const AdminDashboard = lazy(() => import('../admin/AdminDashboardpages/AdminDashboard'));
const AdminRoute = lazy(() => import('./AdminRoute'));
const AdminPrescriptionPage = lazy(() => import('../admin/AdminDashboardpages/AdminPrescriptionPage'));
const PackageDetails = lazy(() => import('../pages/package/PackageDetail'));
const PrescriptionReport = lazy(() => import('../admin/PrescriptionReports'));
const TestDetails = lazy(() => import('../pages/test/TestDetail'));

const ViewAllTest = lazy(() => import('../pages/test/ViewAllTests'));
const HomeCollection = lazy(() => import('../admin/AdminDashboardpages/HomeCollection'));
const TodayloginPage = lazy(() => import('../admin/AdminDashboardpages/TodayloginPage'));
const Contact = lazy(() => import('../admin/AdminDashboardpages/Contact'));
const Users = lazy(() => import('../admin/AdminDashboardpages/Users'));
const TestPage = lazy(() => import('../admin/AdminDashboardpages/TestPage'));
const PackagePage = lazy(() => import('../admin/AdminDashboardpages/PackagePage'));
const Booking = lazy(() => import('../admin/AdminDashboardpages/Booking'));
const BookingListUser = lazy(() => import('../pages/Dashboard/BookingListUser'));
const PasswordChangeForm = lazy(() => import("../pages/Dashboard/PasswordChangeForm"))
const CartBooking = lazy(() => import('../pages/cartbook/CartBooking'));
const SearchResults = lazy(() => import('../search/SearchResults'));
const City = lazy(() => import('../admin/AdminDashboardpages/City'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const PaymentPage = lazy(() => import("../pages/PaymentPage"))
const CartBookingAdmin = lazy(() => import('../admin/AdminDashboardpages/CartBookingAdmin'));



const AppRoutes = () => (
    <Suspense fallback={<div className="text-center text-xl py-10">Loading...</div>}>
        <ScrollToTop /> {/* ✅ Scroll to top on every route change */}

        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/packages" element={<PackagesSection />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path='/disclaimer' element={<Disclaimer />} />
            <Route path="/package/:id" element={<PackageDetails />} />
            <Route path="/test/:id" element={<TestDetails/>} />
            <Route path="/view-all-test" element={<ViewAllTest />} />
            <Route path="/search/:query" element={<SearchResults />} />
     

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Private Routes */}
            <Route
                path="/logout"
                element={
                    <PrivateRoute>
                        <Logout />
                    </PrivateRoute>
                }
            />
            <Route
                path="/user/*"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            >
                <Route path="" element={<Profile />} />
                <Route path="orders" element={<Orders />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="account-details" element={<AccountDetails />} />
                <Route path="booking-list" element={<BookingListUser />} />
                <Route path="change-password" element={<PasswordChangeForm />} />
                <Route path="cart-booking" element={
                    <PrivateRoute>
                        <CartBooking />
                    </PrivateRoute>
                } />
            </Route>

            <Route 
                path="/cart"
                element={
                    <PrivateRoute>
                        <CartPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/upload-prescription"
                element={
                    <PrivateRoute>
                        <UploadPrescription />
                    </PrivateRoute>
                }
            />
            <Route
                path="/download-report"
                element={
                    <PrivateRoute>
                        <ReportDownload />
                    </PrivateRoute>
                }
            />
            <Route
                path="/payment/:reportId"
                element={
                    <PrivateRoute>
                        <PaymentPage />
                    </PrivateRoute>
                }
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />

            {/* Admin Routes */}
            <Route
                path="/admin/*"
                element={
                    <AdminRoute>
                        <FranchisLayout />
                    </AdminRoute>
                }
            >
                <Route path="" element={<AdminDashboard />} />
                <Route path="affiliate-panel" element={<AffiliatePanel />} />
                <Route path="admin-prescription" element={<AdminPrescriptionPage />} />
                <Route path="prescription-report" element={<PrescriptionReport />} />
                <Route path="home-collection" element={<HomeCollection />} />
                <Route path="today-login" element={<TodayloginPage />} />
                <Route path="contact" element={<Contact />} />
                <Route path="users" element={<Users />} />
                <Route path="test" element={<TestPage />} />
                <Route path="package" element={<PackagePage />} />
                <Route path="booking" element={<Booking />} />
                <Route path="city" element={<City />} />
                <Route path="cart-booking-admin" element={<CartBookingAdmin />} />
            </Route>

        </Routes>
    </Suspense>
);

export default AppRoutes;

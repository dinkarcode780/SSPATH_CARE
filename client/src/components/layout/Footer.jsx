import React from "react";
import { Link } from "react-router-dom";
import nbls from "../../assets/icons/nbls.png";
import ssLogo from "../../assets/icons/sslogo.png";
import { FaFacebook, FaShieldAlt, FaLock, FaWallet } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12 border-t-2 border-secondary text-gray-800">
            <div className=" mx-auto px-6 lg:px-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center text-center md:text-left">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex space-x-6 justify-center md:justify-start">
                            <img
                                src={ssLogo}
                                alt="SunShine PathCare Logo"
                                className="h-20 md:h-20 lg:h-20 transition-transform duration-300 hover:scale-105"
                            />

                        </div>
                    </div>

                    {/* Feature Sections */}
                    <div className="flex flex-col items-center">
                        <FaShieldAlt className="text-secondary text-6xl mb-3" />
                        <h2 className="text-lg font-bold">Trustworthy</h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            We ensure that all our products come from authorized sources and meet
                            the highest quality standards.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaLock className="text-secondary text-6xl mb-3" />
                        <h2 className="text-lg font-bold">Protected</h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Your data is secured with advanced encryption and multi-layer authentication.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaWallet className="text-secondary text-6xl mb-3" />
                        <h2 className="text-lg font-bold">Budget-Friendly</h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Enjoy great savings on health products, lab tests, and consultations.
                        </p>
                    </div>
                    {/* <img
                        src={nbls}
                        alt="Secondary Logo"
                        className="h-20 md:h-24 lg:h-24 transition-transform duration-300 hover:scale-105"
                    /> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-4">About Us</h3>
                        <p className="text-sm md:text-base">
                            SUNSHINE PATHCARE PRIVATE LIMITED is a leading healthcare diagnostic center
                            providing high-quality services with ultramodern laboratories.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-4">Useful Links</h3>
                        <ul className="space-y-2 text-md">
                            <li><Link to="/terms-of-use" className="hover:text-primary">Terms & Conditions</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
                            <li><Link to="/about" className="hover:text-primary">Who we are</Link></li>
                        </ul>
                    </div>

                    {/* Menu Links */}
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-4">Menu</h3>
                        <ul className="space-y-2 text-md">
                            <li><Link to="/" className="hover:text-primary">Home</Link></li>
                            <li><Link to="/about" className="hover:text-primary">About</Link></li>
                            <li><Link to="/packages" className="hover:text-primary">Package</Link></li>
                            <li><Link to="/login" className="hover:text-primary">Register</Link></li>
                            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-md">
                           <li>
    <span className="font-semibold">Call Us:</span>{" "}
    <a
      href="tel:+919630045853"
      className="text-primary hover:underline"
    >
      +91 9630045853
    </a>
  </li>
  <li>
    <span className="font-semibold">Mail Us:</span>{" "}
    <a
      href="mailto:account@sspathcare.com"
      className="text-primary hover:underline"
    >
      account@sspathcare.com
    </a>
  </li>
                            <li><span className="font-semibold">Location:</span>Old Minal Residency, D1/32, Minal Residency, Bhopal, Madhya Pradesh 462023</li>
                            {/* <li><span className="font-semibold"></span>gate no 03, in-front of Bundelkhand medical college, Dwarika Garden, Sagar, Madhya Pradesh 470001</li> */}

                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 my-6"></div>

                {/* NABL Section */}
                <div className="bg-primary text-white py-3 text-center text-lg md:text-2xl font-semibold">
                    Network Of NABL Accredited Laboratories
                </div>

                <div className="border-t border-gray-300 my-6"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>
                        © 2024 Sun Shine Pathcare Diagnostics Pvt. Ltd. All Rights Reserved | {' '}
                        <Link to="/unsubscribe" className="hover:text-primary">Unsubscribe</Link>
                    </p>
                    {/* Social Links */}
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="#" className="text-white bg-primary p-2 rounded-full hover:bg-secondary transition"><FaFacebook className="text-2xl" /></Link>
                        <Link to="#" className="text-white bg-primary p-2 rounded-full hover:bg-secondary transition"><AiFillTwitterCircle className="text-2xl" /></Link>
                        <Link to="#" className="text-white bg-primary p-2 rounded-full hover:bg-secondary transition"><AiFillLinkedin className="text-2xl" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

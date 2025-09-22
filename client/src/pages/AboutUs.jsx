import React from 'react';
import { motion } from 'framer-motion';
import home1 from "../assets/images/link-image-2.jpg";

const AboutUs = () => {
    return (
        <div className="bg-gray-50 overflow-x-hidden">
            {/* Banner Section */}
            <div className="relative w-full">
                <img
                    src={home1}
                    alt="About Us Banner"
                    className="w-full h-96  object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="relative w-full h-[200px] pt-10 flex items-center justify-center bg-gradient-to-r ">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center text-white"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg">
                                About Us
                            </h1>
                            <p className="text-lg md:text-xl mt-2 opacity-80">
                                Discover our journey and values.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto py-12 px-6 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="https://sspathcare.com/images/aboutus.png"
                            alt="How We Started"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-semibold text-gray-800">How We Started?</h2>
                        <p className="mt-4 text-gray-600 leading-7">
                            In 2011, we started with a dream to make quality healthcare accessible to every individual in our diverse country. With unwavering dedication and a burning passion to succeed, we have grown to become one of the best diagnostic centers in Madhya Pradesh.
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-800 mt-8">Diagnostics Made Easy!</h2>
                        <p className="mt-4 text-gray-600 leading-7">
                            Sunshine Pathcare Private Limited is an outstanding healthcare diagnostic center that provides high-quality diagnostic services in Madhya Pradesh, Central India. Our NABL-accredited labs ensure accurate and superior test results at affordable prices.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Mission and Approach Section */}
            <div className="container mx-auto py-12 px-6 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <img
                            src="https://th.bing.com/th/id/R.5c8e94f33ced062b863c62634f25b39e?rik=MsCqWfdwUjyhSw"
                            alt="Our Mission"
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                        <h3 className="text-xl font-bold text-gray-800 mt-6">Our Mission</h3>
                        <p className="text-gray-600 mt-2 px-4">
                            To provide quality healthcare services to every individual in Madhya Pradesh.
                        </p>
                    </motion.div>

                    {/* Approach */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <img
                            src="https://dev.rodpub.com/images/271/825_main.jpg"
                            alt="Our Approach"
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                        <h3 className="text-xl font-bold text-gray-800 mt-6">Our Approach</h3>
                        <p className="text-gray-600 mt-2 px-4">
                            We use cutting-edge technology and advanced diagnostic methods to ensure accurate results.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

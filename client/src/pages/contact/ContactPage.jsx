import React, { useState } from "react";
import ContactForm from "./ContactForm";
import { useEffect } from "react";
import home1 from "../../assets/images/link-image-2.jpg";

const ContactPage = () => {
    const cities = [
        {name:"Sun Sunshine Pathcare, (Central Process Unit)", address:"Sun Sunshine Pathcare, D1/32,Old Minal,Bhopal 462023",map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.2574300575043!2d77.4557568!3d23.270094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c698856c6eba7%3A0x3d2642e07f0c1ba8!2sSunShine%20PathCare%20(%20SS%20PathCare%20)-%20Best%20Pathology%20Lab%20Blood%20test%20%26%20Diagnostic%20Centre%20in%20Bhopal!5e0!3m2!1sen!2sin!4v1752638999295!5m2!1sen!2sin"},
        { name: "Neem Tal Gandhi Chock Vidisha", address: "Gandhi Chowk, Swarnkar Colony, Baripura, Vidisha, Madhya Pradesh 464001", map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.401808369264!2d77.79727170000001!3d23.5180464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c676182950ad3%3A0xa50b4353bfd4638c!2sSunShine%20%2F%20SS%20PathCare%20(NABL%20Accredited%20laboratory)%20IN%20vidisha%20(Pathology%20lab)!5e0!3m2!1sen!2sin!4v1752638692163!5m2!1sen!2sin" },
        {name:"S S Path Care Pvt Ltd in Sagar",address:"S S Path Care Pvt Ltd in Sagar is located at Tili Road, Tilli, Sagar - 470001, ",map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.9515288383645!2d78.751925!3d23.820322599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3978d7e23cddb239%3A0x2e4752bd3c440e!2sSunShine%20PathCare%20(SS%20PathCare)%20-%20Best%20Pathology%20Lab%20%7C%20Full%20Body%20Checkup%20%26%20Diagnostic%20Centre%20in%20Sagar!5e0!3m2!1sen!2sin!4v1752638957719!5m2!1sen!2sin"},
        {name:"SunShine / SS PathCare (NABL Accredited laboratory) IN vidisha",address:"medical college, Sanchi Rd, in-front of traffic thana, Shastri Nagar, Vidisha, Madhya Pradesh 464001",map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4442.009971118046!2d77.79746473717655!3d23.518126472501073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c676182950ad3%3A0xa50b4353bfd4638c!2sSunShine%20%2F%20SS%20PathCare%20(NABL%20Accredited%20laboratory)%20IN%20vidisha%20(Pathology%20lab)!5e0!3m2!1sen!2sin!4v1752639080239!5m2!1sen!2sin"},
        {name:"Subhash Nagar Hajeepur Sironj-",address:"Ward No. 01 Maharada Pratap Marg Subhash Nagar Hajeepur Sironj-464288", map:"https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d1870731.9554931866!2d76.908558!3d23.684062!3m2!1i1024!2i768!4f13.1!2m1!1sWard%20No.%2001%20Maharada%20Pratap%20Marg%20Subhash%20Nagar%20Hajeepur%20Sironj-464288!5e0!3m2!1sen!2sin!4v1736579607270!5m2!1sen!2sin"},
        { name: "Sanchi Raod,Raisen",address: "Shop No. 10 Asha Medical Sanchi Raod,Raisen -pin 464551", map: "https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d7326.282315266748!2d77.77024!3d23.3469!3m2!1i1024!2i768!4f13.1!2m1!1sShop%20No.%2010%20Asha%20Medical%20Sanchi%20Raod%2C%20Raisen%20-pin%20464551!5e0!3m2!1sen!2sin!4v1736580027282!5m2!1sen!2sin" },
        { name: "Ss Path Care Bina",address: "Sspath, Care Pitra Ashish, Pushp Vihar Colony, Chitrakoot, Bina-470113", map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.7442061045363!2d78.20390197512926!3d24.180702078379213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39796df053badb83%3A0x44eff0c252ec262!2sSs%20Path%20Care%20Bina!5e0!3m2!1sen!2sin!4v1753532562709!5m2!1sen!2sin" },
        { name: "Ss Path Care Bina",address: "Sspath, Care Pitra Ashish, Pushp Vihar Colony, Chitrakoot, Bina-470113", map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.7442061045363!2d78.20390197512926!3d24.180702078379213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39796df053badb83%3A0x44eff0c252ec262!2sSs%20Path%20Care%20Bina!5e0!3m2!1sen!2sin!4v1753532562709!5m2!1sen!2sin" },

    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle Next Button
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cities.length);
    };

    // Handle Previous Button
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className="">
            <div className="relative w-full">
                <img
                    src={home1}
                    alt="About Us Banner"
                    className="w-full h-96  object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-white text-3xl md:text-5xl font-bold">Contact Us</h1>
                </div>
            </div>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">

                {/* Header */}
                <h1 className="text-4xl text-black font-bold mb-8">Our Presence</h1>

                {/* Scrolling City Box */}
                <div className="relative w-full max-w-7xl bg-white shadow-md rounded-lg p-4">
                    {/* Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-full hover:bg-[#025d4c] shadow-lg"
                    >
                        &#8592; Prev
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-full hover:bg-[#025d4c] shadow-lg"
                    >
                        Next &#8594;
                    </button>
                    
                    {/* City Name */}
                    <div className="text-center text-xl font-semibold py-4 text-gray-800">
                        {cities[currentIndex].name}
                        <p className="text-gray-500 text-sm">{cities[currentIndex].address}</p>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-10 w-full max-w-7xl h-96 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        src={cities[currentIndex].map}
                        title={cities[currentIndex].name}
                        width="100%"
                        height="100%"
                        allowFullScreen=""
                        loading="lazy"
                        className="border-0"
                    ></iframe>
                </div>

                {/* contact form */}
                <div>
                    <ContactForm />
                </div>

            </div>
        </div>
    );
};

export default ContactPage;

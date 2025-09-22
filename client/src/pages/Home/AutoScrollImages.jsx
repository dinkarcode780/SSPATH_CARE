import React, { useEffect, useState } from "react";
import home1 from "./home2.png";
// import home2 from "../../assets/images/home-1.png";

const AutoScrollImages = () => {
  const images = [
    home1, // ✅ Ensure it's directly added as a string (imported image will resolve to a path)
    // "https://img.freepik.com/premium-photo/close-up-male-scientist-looking-through-microscope-laboratory_1048944-24729411.jpg?w=826",
    // "https://img.freepik.com/premium-photo/life-scientists-researching-laboratory-focused-female-life-science-professional-pipetting-solution-into-glass-cuvette_43780-6248.jpg?w=740",
    // "https://img.freepik.com/free-photo/experiments-chemistry-lab-conducting-experiment-laboratory_155003-1401.jpg?t=st=1738667152~exp=1738670752~hmac=89aea2492edc3ac86d35035584e0f5c87f54bd9eac724b24cb1729976109e1ae&w=740",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full md:h-96 overflow-hidden rounded-lg">
      <img
        src={images[currentImageIndex]} // ✅ Ensure src receives a string value
        alt={`Slide ${currentImageIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-1000 ease-in-out"
      />
    </div>
  );
};

export default AutoScrollImages;

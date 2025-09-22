import React from "react";

const Features = () => {
    const features = [
        {
            title: "NABL Accredited Labs",
            description: "Follows all protocols as per NABL & CAP Guidelines",
            icon: "🏅", // Replace with an appropriate icon or image
        },
        {
            title: "Trusted by Leading Doctors & Hospitals",
            description: "Qualified Pathologist at each lab",
            icon: "👨‍⚕️",
        },
        {
            title: "Shortest Reporting Time",
            description: "Ownership and Innovation",
            icon: "⏱️",
        },
        {
            title: "Accurate Test Reports",
            description: "Quality checks by Quality Assurance Team",
            icon: "✔️",
        },
        {
            title: "1 Crore+ Satisfied Customers",
            description: "Making superior quality diagnostics services",
            icon: "🌟",
        },
        {
            title: "100+ Labs",
            description: "Large Network Labs in all the major cities",
            icon: "🏥",
        },
        {
            title: "3000+ Collection Centres",
            description: "Expanding our reach and counting",
            icon: "📍",
        },
        {
            title: "Scientific Orientation",
            description: "MD Doctors in Every Lab, State-of-the-Art Machines",
            icon: "🔬",
        },
    ];

    return (
        <div className="bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-black mb-8">
                Why Sun Shine Pathcare Labs
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;

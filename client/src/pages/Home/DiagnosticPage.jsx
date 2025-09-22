import React from "react";
import AutoScrollImages from "./AutoScrollImages";
import HomeCollectionForm from "./HomeCollectionForm";

const DiagnosticPage = () => {
    return (
        <div className="flex flex-wrap items-center gap-4   justify-center bg-gray-100 p-6">
            {/* Left: Auto-Scrolling Images */}
            <div className="w-full lg:w-2/3 flex justify-center">
                <AutoScrollImages />
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-lg p-6">
                <HomeCollectionForm />
            </div>
        </div>
    );
};

export default DiagnosticPage;

import React from 'react';
import Features from './Features';
import WellnessPackages from './WellnessPackages';
import DiagnosticPage from './DiagnosticPage';
import PrescribedTests from './PrescribedTests';

const Home = () => {
    return (
        <div className="min-h-screen hide-scrollbar md:pt-10 pb-5 ">
            <DiagnosticPage />
            <WellnessPackages />
            <PrescribedTests />
            <Features />
        </div>
    );
};

export default Home;

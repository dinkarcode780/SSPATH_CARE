import React, { useState, useEffect } from 'react';
;

const Marquee = () => {

    return (
        <div className="relative md:hidden w-full overflow-hidden bg-primary text-white py-1">
            <div className="animate-marquee whitespace-nowrap text-white text-lg flex">
                Network Of NABL Accredited Laboratories
            </div>
        </div>
    );
};

export default Marquee;

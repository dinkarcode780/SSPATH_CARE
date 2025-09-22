import React from "react";

const Disclaimer = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 relative inline-block">
          Disclaimer
          <span className="absolute left-0 bottom-0 w-full h-1 bg-[#EF7F00] transition-all duration-300 before:absolute before:h-1 before:bg-[#EF7F00] before:w-0 before:transition-all before:duration-300 before:left-0 before:bottom-0 hover:before:w-full after:absolute after:h-1 after:bg-[#EF7F00] after:w-0 after:transition-all after:duration-300 after:right-0 after:bottom-0 hover:after:w-full"></span>
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          The information contained herein is provided for informational purposes only and should not be construed as legal advice on any subject matter. The content of this site contains general information and may not reflect current legal developments, verdicts or settlements.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Any information contained on this site is not intended to be a substitute for legal counsel. No one should act or refrain from acting on the basis of any content included on this site but should instead seek the appropriate legal advice on the particular facts and circumstances at issue from a properly licensed attorney. The author expressly disclaims all liability in respect to actions taken or not taken based on any of the contents of this site.
        </p>
        <p className="text-gray-700 leading-relaxed">
          By accessing this site you acknowledge that this information is not provided in the course of an attorney-client relationship and is not intended to constitute legal advice. This site is not intended to be advertising and the author does not wish to represent anyone desiring representation based upon viewing this site in a state in which the site fails to comply with all laws and ethical rules.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;

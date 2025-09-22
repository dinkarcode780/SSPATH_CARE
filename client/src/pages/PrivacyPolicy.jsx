import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container px-6 py-12 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Sun Shine Pathcare Labs is committed to protecting your privacy. It is important to us that our
        customers retain their privacy while taking advantage of the services that we have to
        offer. To this end, we adhere to the following basic principles:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">
          We employ the highest levels of security to keep your personal information strictly
          confidential.
        </li>
        <li className="mb-2">
          We will not disclose or sell any of your personal information, including your name,
          address, age, sex, or medical history to any third party without your permission.
        </li>
      </ul>
      <p className="mb-4">
        Although we use cookie technology to help users navigate our site efficiently, we never use
        cookies to store personal information, such as credit card numbers. Please be aware,
        however, that our site contains links to other sites and that the privacy practices of
        other sites may differ from those of Ss Pathcare Labs.
      </p>
      <p className="mb-4">
        If you have any additional questions or concerns regarding our privacy policies, please
        email us at{" "}
        <a
          href="mailto:account@sspathcare.com"
          className="text-blue-500 underline"
        >
          account@sspathcare.com
        </a>{" "}
        and we'll respond within 48 hours.
      </p>
    </div>
  );
};

export default PrivacyPolicy;

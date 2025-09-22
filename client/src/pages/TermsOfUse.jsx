import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="container mx-auto p-6 text-gray-800 py-10">
      <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>

      <p className="mb-4">
        These terms of use (this "Agreement") set forth the standards of use of
        <a href="https://www.sspathcare.com" className="text-blue-500 underline ml-1">www.Sspathcare.com</a>
        and all of its associated pages and websites. The link www.Sspathcare.com and all such associated pages and websites are collectively referred to herein as the "Website."
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Terms and Conditions of Business</h2>

      <p className="mb-4">"Conditions" mean these standard terms and conditions.</p>
      <p className="mb-4">"Company" means Ss pathcare Diagnostics Pvt. Ltd.</p>
      <p className="mb-4">"Customer" means you, the reader.</p>

      <h3 className="text-xl font-semibold mt-6 mb-4">1. General</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>The services shall be as set out in the services list.</li>
        <li>By ordering a Service hereunder, the Customer accepts these terms and conditions.</li>
        <li>The terms and conditions may be subject to change at any time and it is the Customer’s responsibility to check for amendments before ordering Services.</li>
        <li>All orders placed by a Customer shall be subject to the written acceptance of the Company and service availability.</li>
        <li>The Customer shall provide their full name, address, and contact details. Refer to the Company’s Privacy Policy for information handling practices.</li>
        <li>The Company will endeavor to deliver the Services promptly and within seven days of payment, subject to conditions.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-4">2. Price</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>The prices of the Services shall be as per the Price List and are correct at the time of publication.</li>
        <li>Prices are quoted in Indian Rupees ("Rs") and are inclusive of applicable taxes.</li>
        <li>The Company reserves the right to change prices without prior notice.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-4">3. Payment and Delivery</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Full payment must be made before delivery, unless otherwise agreed in writing.</li>
        <li>Payment methods include credit card, debit card, net banking, UPI, and payment wallets (India only).</li>
        <li>Convenience charges may apply for home visits or deliveries.</li>
        <li>The Company is not liable for payment process malfunctions or defects.</li>
        <li>Test reports may be accessed on the Website using the provided Patient ID and Password.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-4">4. Refund and Cancellation</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Orders cannot be amended or canceled unless agreed by the Company. Cancellation costs may apply.</li>
        <li>Refunds will be processed to the original payment method and not through other means.</li>
        <li>For cancellations and refunds, contact us at <a href="mailto:account@sspathcare.com" className="text-blue-500 underline">account@sspathcare.com</a>.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-4">5. Use of Service</h3>
      <p className="mb-4">
        The Company provides recommended use and storage instructions in the Service Information Sheet. These are for informational purposes only, and the Company is not liable for damages resulting from their use.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-4">6. Liability</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>The Company’s liability is limited to the Price paid for the Services.</li>
        <li>The Company is not liable for indirect damages, including loss of business, profits, or goodwill.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-4">7. Quality Control</h3>
      <p className="mb-4">
        The Company will comply with applicable regulations and legal requirements to ensure quality control.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-4">8. Termination</h3>
      <p className="mb-4">
        The Company may terminate the agreement if the Customer breaches the Conditions or undergoes insolvency proceedings.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-4">9. Miscellaneous</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>The Conditions are governed by Indian Law, and disputes are subject to Indian Courts.</li>
        <li>If any provision is deemed invalid, the remaining provisions remain effective.</li>
      </ul>
    </div>
  );
};

export default TermsOfUse;

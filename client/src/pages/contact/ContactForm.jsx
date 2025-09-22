import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../features/contact/contactFormSlice';
import { toast } from 'react-toastify';
import contact02 from "../../assets/images/contact02.webp";

const ContactForm = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.contactForm);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phoneNumber: '',
    email: '',
    message: '',
  });

  // Reset form on successful submission
  useEffect(() => {
    if (successMessage) {
      setFormData({
        name: '',
        city: '',
        phoneNumber: '',
        email: '',
        message: '',
      });
    }
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(submitContactForm(formData));
    setFormData({
      name: '',
      city: '',
      phoneNumber: '',
      email: '',
      message: '',
    })
    
    setTimeout(() => {
      toast.success("Your message has been sent successfully!");
    }, 2000);
  
  };


  return (
    <div className="grid md:grid-cols-1 items-center overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl  mx-auto bg-white my-6 font-[sans-serif]">
      {/* Form Section */}
      <div className="p-8 bg-black">
        <h2 className="text-3xl font-bold text-white">
          Get In <span className="text-[#0A9799]">Touch</span>
        </h2>
        <p className="text-sm text-white mt-4 leading-relaxed">
          Have a specific inquiry or looking to explore new opportunities? Our experienced team is ready to engage with you.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mt-8">
            <input
              name='name'
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              className="px-2 py-3 bg-transparent text-white w-full text-sm border-b border-gray-400 focus:border-yellow-400 outline-none"
            />
            <input
              name='city'
              type="text"
              placeholder="City"
              onChange={handleChange}
              value={formData.city}
              className="px-2 py-3 bg-transparent text-white w-full text-sm border-b border-gray-400 focus:border-yellow-400 outline-none"
            />
            <input
              name='phoneNumber'
              type="number"
              placeholder="Phone No."
              onChange={handleChange}
              value={formData.phoneNumber}
              className="px-2 py-3 bg-transparent text-white w-full text-sm border-b border-gray-400 focus:border-yellow-400 outline-none"
            />
            <input
              name='email'
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              className="px-2 py-3 bg-transparent text-white w-full text-sm border-b border-gray-400 focus:border-yellow-400 outline-none"
            />
            <textarea
              name='message'
              placeholder="Write Message"
              onChange={handleChange}
              value={formData.message}
              className="px-2 pt-3 bg-transparent text-white w-full text-sm border-b border-gray-400 focus:border-yellow-400 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex items-center justify-center text-sm w-full rounded-md px-6 py-3 tracking-wide text-white bg-[#0A9799] hover:bg-[#0A9799] focus:outline-none disabled:opacity-60"
          >
            {loading ? (
              <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 548.244 548.244"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                />
              </svg>
            )}
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Contact Info */}
        <ul className="mt-4 flex flex-wrap justify-center gap-4 lg:space-x-6 max-lg:flex-col max-lg:items-center max-lg:space-y-2 ">
          <li className="flex items-center text-white">
            📧 <span className="ml-2 text-sm">account@sspathcare.com</span>
          </li>
          <li className="flex items-center text-white">
            📞 <span className="ml-2 text-sm">+919630045853</span>
          </li>
        </ul>
      </div>


    </div>
  );
};

export default ContactForm;

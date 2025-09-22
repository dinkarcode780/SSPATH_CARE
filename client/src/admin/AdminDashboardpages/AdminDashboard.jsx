import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { HiDocumentText, HiHome, HiChat, HiUser } from 'react-icons/hi'; // Importing icons
import Prescription from '../AdminDashboardpages/AdminPrescriptionPage';
import HomeCollection from '../AdminDashboardpages/HomeCollection';
import Contact from '../AdminDashboardpages/Contact';
import TodayloginPage from './TodayloginPage';
import { fetchPrescriptions } from "../../features/adminPrescription/adminPrescriptionSlice";
import { fetchHomeCollection } from '../../features/homecollection/homecollectionSlice';
import { fetchContacts } from '../../features/contact/contactFormSlice';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const sectionRef = useRef(null); // Ref for the selected section

  const renderComponent = () => {
    switch (selectedSection) {
      case 'Prescriptions':
        return <Prescription />;
      case 'Home Collections':
        return <HomeCollection />;
      case 'Contacts Queries':
        return <Contact />;
      default:
        return <TodayloginPage />;
    }
  };

  const dispatch = useDispatch();
  const { prescriptions } = useSelector((state) => state.adminPrescriptions);
  const { homeCollections } = useSelector((state) => state.homeCollection);
  const { contacts } = useSelector((state) => state.contactForm);

  useEffect(() => {
    dispatch(fetchPrescriptions());
    dispatch(fetchHomeCollection());
    dispatch(fetchContacts());
  }, [dispatch]);

  const todayLoginUsers = JSON.parse(localStorage.getItem('todayLoginUsers')) || [];

  // Prepare data for the chart and summary
  const data = [
    { name: 'Prescriptions', value: prescriptions.length, color: '#0088FE' },
    { name: 'Home Collections', value: homeCollections.length, color: '#00C49F' },
    { name: 'Contacts Queries', value: contacts.length, color: '#FFBB28' },
    { name: 'Today Login Users', value: todayLoginUsers.length, color: '#FF8042' },
  ];

  // Function to handle smooth scrolling
  const handleSectionClick = (sectionName) => {
    setSelectedSection(sectionName);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Small delay to ensure the component is rendered
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 card-body-main">
      {/* Dashboard Header */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Admin Dashboard
      </h1>

      {/* Data Summary Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {data.map((section, index) => (
          <div
            key={index}
            onClick={() => handleSectionClick(section.name)} // Set the selected section and scroll
            style={{
              background: `linear-gradient(to bottom, ${section.color}, ${section.color})`,
            }}
            className="p-4 md:p-6 leading-5 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow flex flex-col items-center text-lg font-medium text-gray-700 cursor-pointer"
          >
            {/* Icon */}
            {section.name === 'Prescriptions' && <HiDocumentText className="text-4xl text-white mb-4" />}
            {section.name === 'Home Collections' && <HiHome className="text-4xl text-white mb-4" />}
            {section.name === 'Contacts Queries' && <HiChat className="text-4xl text-white mb-4" />}
            {section.name === 'Today Login Users' && <HiUser className="text-4xl text-white mb-4" />}

            <span className="text-sm md:text-xl text-center font-bold text-white">{section.name}</span>
            <span className="text-2xl spacey-2 font-semibold text-white">{section.value}</span>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Overview of Data</h4>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Pie Chart */}
          <div className="w-full md:w-1/1.5 flex items-center justify-center">
            <PieChart width={600} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Legend with Matching Colors */}
          <div className="w-full md:w-1/2">
            <ul className="space-y-4">
              {data.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-gray-700 text-sm md:text-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Render Selected Component */}
      <div ref={sectionRef} className="bg-white p-6 rounded-lg shadow-md">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Menu Button */}
      <div className="menu-button w-full">
        <div className="menu-content bg-primary flex py-1 justify-between items-center">
          <span className="text-white text-sm">Welcome 🙏 Sun Shine Pathcare</span>
          <button className="toggle-btn bg-white" onClick={toggleSidebar}>
            <i className="fas fa-bars text-primary"></i>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          {/* Dashboard */}
          <Link to="/admin" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>

          <Link to="/admin/cart-booking-admin" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-shopping-cart"></i> Cart Booking
          </Link>

          {/* Prescriptions */}
          <Link to="/admin/admin-prescription" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-prescription-bottle"></i> Prescriptions
          </Link>

          {/* Home Collection */}
          <Link to="/admin/home-collection" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-home"></i> Home Collection
          </Link>

          {/* Contact Query */}
          <Link to="/admin/contact" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-envelope"></i> Contact Query
          </Link>

          {/* Users */}
          <Link to="/admin/users" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-users"></i> Users
          </Link>

          {/* Upload Report */}
          <Link to="/admin/prescription-report" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-upload"></i> Upload Report
          </Link>

          {/* Create Test */}
          <Link to="/admin/test" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-flask"></i> Create Test
          </Link>

          {/* Create Package */}
          <Link to="/admin/package" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-box-open"></i> Create Package
          </Link>

          {/* Create Booking */}
          <Link to="/admin/booking" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-calendar-check"></i> Create Booking
          </Link>

          {/* Create Cities */}
          <Link to="/admin/city" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-city"></i> Create Cities
          </Link>

          {/* Today Login */}
          <Link to="/admin/today-login" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-sign-in-alt"></i> Today Login
          </Link>

          {/* Logout */}
          <Link to="/logout" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </nav>
      </aside>

      {/* Backdrop */}
      <div
        className={`backdrop ${isSidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
    </>
  );
};

export default Sidebar;
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import OverView from "../pages/users/OverView";

const UserDashboard = () => {
  const sidebarLinks = [
    { path: "/user-dashboard", label: "Home" },
    { path: "/login", label: "Logout" },
  ];

  return (
    <div className="dashboard-app">
      <Navbar />
      <div className="dashboard-main-content">
        <Sidebar sidebarLinks={sidebarLinks} />
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<OverView />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

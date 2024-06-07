import React from "react";

import { Route, Routes } from "react-router-dom";
import CreateUser from "../pages/admin/CreateUser";
import OverView from "../pages/admin/OverView";
import ViewUser from "../pages/admin/ViewUser";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const AdminDashboard = () => {
  const sidebarLinks = [
    { path: "/admin-dashboard", label: "Home" },
    { path: "/admin-dashboard/create_user", label: "Create User" },
    { path: "/admin-dashboard/view_user", label: "View Users" },
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
            <Route path="/create_user" element={<CreateUser />} />
            <Route path="/view_user" element={<ViewUser />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

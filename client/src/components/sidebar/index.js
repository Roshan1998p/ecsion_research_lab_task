import React from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarLinks }) => {
  const location = useLocation();

  // Define sidebar links

  return (
    <div className="sidebar">
      <ul className="sidebar-links">
        {sidebarLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

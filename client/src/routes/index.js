import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ parent, path, process, isAuthenticated, children }) => {
  // if (user.type === "Admin") {
  //   return children;
  // }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export default PrivateRoute;

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext.js";
import Login from "./pages/login/Login.js";
import PrivateRoute from "./routes/index.js";
const AdminDashboard = React.lazy(() =>
  import("./routes/admin.js")
);
const UserDashboard = React.lazy(() =>
  import("./routes/users.js")
);
const AppRoutes = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin-dashboard/*"
        element={
          <PrivateRoute
            isAuthenticated={auth.isAuthenticatedAdmin}
            parent="Admin"
            path="dashboard"
            process="write"
          >
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-dashboard/*"
        element={
          <PrivateRoute
            isAuthenticated={auth.isAuthenticatedUser}
            parent="User"
            path="dashboard"
            process="write"
          >
            <UserDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoutes;

import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "./components/loader/index.js";
import { AuthProvider } from "./AuthContext.js"; // Import AuthContext
import AppRoutes from "./AppRoutes.js";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </Suspense>
  );
}

export default App;

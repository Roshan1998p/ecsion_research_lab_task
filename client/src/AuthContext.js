// AuthContext.js
import { createContext, useContext, useState } from "react";
import { getAuthData, setAuthData } from "./utils";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getAuthData());

  const storeAuth = (obj) => {
    setAuthData(obj);
    setAuth(obj);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: storeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

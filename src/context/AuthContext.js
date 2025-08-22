// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { saveToken, getToken, deleteToken } from "../../hooks/secureStore";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      if (token) {
        setUserToken(token);
      }
      setLoading(false);
    };
    loadToken();
  }, []);
  const login = async (token) => {
    await saveToken(token);
    setUserToken(token);
  };
  const logout = async () => {
    await deleteToken();
    setUserToken(null);
  };
  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

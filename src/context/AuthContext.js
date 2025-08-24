// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { saveToken, getToken, deleteToken } from "../../hooks/secureStore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log("🔄 AuthProvider rendered");

  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("⚡ useEffect triggered: checking for stored token...");
    const loadToken = async () => {
      try {
        const token = await getToken();
        console.log("📦 Retrieved token from storage:", token);
        if (token) {
          setUserToken(token);
          console.log("✅ Token set in state:", token);
        } else {
          console.log("❌ No token found in storage");
        }
      } catch (error) {
        console.error("🔥 Error loading token:", error);
      } finally {
        setLoading(false);
        console.log("⏹️ Finished loading token, loading set to false");
      }
    };
    loadToken();
  }, []);

  const login = async (token) => {
    console.log("🔑 login called with token:", token);
    try {
      await saveToken(token);
      console.log("💾 Token saved to storage:", token);
      setUserToken(token);
      console.log("✅ Token updated in state:", token);
    } catch (error) {
      console.error("🔥 Error during login:", error);
    }
  };

  const logout = async () => {
    console.log("🚪 logout called");
    try {
      await deleteToken();
      console.log("🗑️ Token deleted from storage");
      setUserToken(null);
      console.log("✅ Token cleared from state");
    } catch (error) {
      console.error("🔥 Error during logout:", error);
    }
  };

  console.log("📡 Context values =>", {
    userToken,
    loading,
  });

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


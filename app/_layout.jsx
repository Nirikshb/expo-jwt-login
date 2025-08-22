import { Stack, useRouter } from "expo-router";
import { AuthProvider, AuthContext } from "../src/context/AuthContext";
import React, { useContext, useEffect } from "react";
function AuthGuard({ children }) {
  const { userToken, loading } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (userToken) {
        router.replace("/home");
      } else {
        router.replace("/");
      }
    }
  }, [userToken, loading]);

  return children;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Stack />
      </AuthGuard>
    </AuthProvider>
  );
}

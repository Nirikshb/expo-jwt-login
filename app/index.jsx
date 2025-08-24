// app/index.js
import { Text, View, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import Login from "../components/login";
import { AuthContext } from "../src/context/AuthContext";
import Home from './home'
export default function Index() {
  const { userToken, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color='green' />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userToken ? (
        <Home />
      ) : (
        <Login />
      )}
    </View>
  );
}

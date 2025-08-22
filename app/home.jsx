// app/home.js
import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../src/context/AuthContext";
export default function Home() {
  const { logout } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Home 🎉</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

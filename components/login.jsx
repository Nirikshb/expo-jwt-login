import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { AuthContext } from "../src/context/AuthContext";

const Login = () => {
  const [name, setName] = useState("alice");
  const [pass, setPass] = useState("password123");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.31.216:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, password: pass }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.accessToken;

        // 🔑 save + update context
        login(token);
      } else {
        console.log("Login failed:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    width: "80%",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default Login;

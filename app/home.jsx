// app/home.js
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../src/context/AuthContext";
import {apiFetch} from '../src/apiClient';

export default function Home() {
  const { logout, userToken } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);


  async function getProfile() {
    try {
      const response = await apiFetch("protected/profile", { method: "GET" });
      const data = await response.json();

      console.log("📡 API status:", response.status);
      console.log("👤 Profile data:", data);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
    }
  }
  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      {profile?.user ? (
        <>
          <Text style={styles.item}>ID: {profile.user.id}</Text>
          <Text style={styles.item}>Username: {profile.user.username}</Text>
          <Text style={styles.item}>Issued At: {profile.user.iat}</Text>
          <Text style={styles.item}>Expires At: {profile.user.exp}</Text>
        </>
      ) : (
        <Text>No profile data found</Text>
      )}
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
});

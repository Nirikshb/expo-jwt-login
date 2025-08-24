// secureStore.js
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "accessToken";

export async function saveToken(token) {
  try {
    console.log("Saving token:", token);
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
}

export async function getToken() {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    console.log("📦 Retrieved token:", token);
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

export async function deleteToken() {
  try {
    console.log("Deleting token...");
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    console.log("Token deleted successfully");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
}

// // secureStore.js
// import * as SecureStore from "expo-secure-store";

// const ACCESS_KEY = "accessToken";
// const REFRESH_KEY = "refreshToken";

// export async function saveTokens(access, refresh) {
//   await SecureStore.setItemAsync(ACCESS_KEY, access);
//   await SecureStore.setItemAsync(REFRESH_KEY, refresh);
// }

// export async function getAccessToken() {
//   return await SecureStore.getItemAsync(ACCESS_KEY);
// }

// export async function getRefreshToken() {
//   return await SecureStore.getItemAsync(REFRESH_KEY);
// }

// export async function deleteTokens() {
//   await SecureStore.deleteItemAsync(ACCESS_KEY);
//   await SecureStore.deleteItemAsync(REFRESH_KEY);
// }
// apiClient.js
import { getToken, saveToken, deleteToken } from "../hooks/secureStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.31.216:3001";

// Reusable fetch wrapper
export async function apiFetch(endpoint, options = {}) {
  console.log("apiFetch called with:", { endpoint, options });

  let token = await getToken();
  console.log("Retrieved token:", token);

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  console.log("Final request headers:", headers);

  let response;
  try {
    console.log("Making request to:", `${API_URL}${endpoint}`);
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include", // send refresh cookie
    });
    console.log("Response status:", response.status);
  } catch (err) {
    console.error("Network error during fetch:", err);
    throw err;
  }

  // If unauthorized, try refresh
  if (response.status === 401) {
    console.log("401 Unauthorized. Attempting refresh...");

    const refreshed = await refreshAccessToken();
    console.log("Refresh attempt result:", refreshed);

    if (!refreshed) {
      console.log("Refresh failed. Deleting token and returning original response.");
      await deleteToken();
      return response;
    }

    // Retry original request with new token
    token = await getToken();
    console.log("Retrieved new token after refresh:", token);

    const retryHeaders = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
    console.log("Retry request headers:", retryHeaders);

    try {
      console.log("Retrying request to:", `${API_URL}${endpoint}`);
      response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: retryHeaders,
        credentials: "include",
      });
      console.log("Retry response status:", response.status);
    } catch (err) {
      console.error("Network error during retry fetch:", err);
      throw err;
    }
  }

  return response;
}

// Call backend /refresh to get new access token
async function refreshAccessToken() {
  console.log("refreshAccessToken called. Making request to:", `${API_URL}/auth/refresh`);

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    console.log("Refresh response status:", res.status);

    if (!res.ok) {
      console.error("Failed to refresh token. Status:", res.status);
      return false;
    }

    const data = await res.json();
    console.log("Refresh response JSON:", data);

    if (data.accessToken) {
      console.log("Saving new access token:", data.accessToken);
      await saveToken(data.accessToken);
      return true;
    }

    console.log("No access token found in refresh response.");
    return false;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return false;
  }
}

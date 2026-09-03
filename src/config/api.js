const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://expense-tracker-api-two-sepia.vercel.app");
// Strip trailing slash if present
export const API_URL = rawApiUrl.replace(/\/+$/, "");
export const API_BASE = `${API_URL}/api`;

/**
 * Get auth token from localStorage or sessionStorage
 */
export const getAuthToken = () => {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    null
  );
};

/**
 * Get headers object with Bearer token if present
 */
export const getAuthHeaders = (additionalHeaders = {}) => {
  const token = getAuthToken();
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...additionalHeaders,
  };
};

/**
 * Get stored user profile from localStorage or sessionStorage
 */
export const getStoredUser = () => {
  try {
    const localUser = localStorage.getItem("user");
    const sessionUser = sessionStorage.getItem("user");
    if (localUser) return JSON.parse(localUser);
    if (sessionUser) return JSON.parse(sessionUser);
  } catch (err) {
    console.error("Error parsing stored user:", err);
  }
  return null;
};

/**
 * Clear authentication data from all storages
 */
export const clearAuthStorage = () => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  } catch (err) {
    console.error("Error clearing auth storage:", err);
  }
};

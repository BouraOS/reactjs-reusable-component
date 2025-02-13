import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-api-base-url", // Replace with your API base URL
  timeout: 10000, // Set a default timeout (optional)
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here
  },
});
const authAxios = axios.create({
  baseURL: "https://your-api-base-url", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add an authorization accessToken to the request header
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Configure axios to include cookies with each request
// axiosInstance.defaults.withCredentials = true;

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (accessToken) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

const addSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

axiosInstance.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        // If isRefreshing is true, return a new Promise that will resolve with the new accessToken when it's available.
        return new Promise((resolve) => {
          addSubscriber((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      isRefreshing = true; // Set isRefreshing to true to prevent multiple refresh requests.

      try {
        const refreshToken = localStorage.getItem("refreshToken"); // Retrieve the stored refresh accessToken.
        // Make a request to your auth server to refresh the accessToken.
        // warning: use axios.post not axiosInstance to avoid infinite loop
        const response = await authAxios.post("/refresh-token", {
          refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Store the new access and refresh tokens.
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        onRefreshed(accessToken); // Notify subscribers that the accessToken has been refreshed.
        // Update the authorization header with the new access accessToken.
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new access accessToken.
      } catch (refreshError) {
        // Handle refresh accessToken errors by clearing stored tokens and redirecting to the login page.
        if (error.response?.data.error === "invalid_refresh_token") {
          console.error("Token refresh failed:", refreshError);
          // You can use Helper function Logout() here to clear tokens and redirect
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // localStorage.clear();
          window.location.href = "/login";
        } else {
          console.error("Unhandled error:", error);
        }
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);

export default axiosInstance;

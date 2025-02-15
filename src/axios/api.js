import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-base-url', // Replace with your API base URL
  timeout: 10000, // Set a default timeout (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
});

axiosInstance.interceptors.request.use(
  config => {
    // Add an authorization token to the request header

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle error responses here
    if (error.response.status === 401) {
      // Redirect to login page or handle authentication errors
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
import axios from "axios";

const URL = "https://hblab.rw"; // Use HTTPS for the backend URL
const axiosInstance = axios.create({
  baseURL: `${URL}`,
  withCredentials: true, // Allow sending cookies if required
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Log responses and errors for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Error response:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

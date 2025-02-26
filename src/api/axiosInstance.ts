import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('sessionId_sc');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Your session has expired. Please log in again.", {
        autoClose: 5000,
        closeOnClick: true,
        position: "top-center",
      });

      console.log("Session expired.");

      // Remove the session token from cookies
      Cookies.remove("sessionId_sc");

      // Redirect after 5 seconds
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 5000);
    }

    if (error.response?.status === 500) {
      toast.error("Server error. Please try again later.", {
        autoClose: 5000,
        closeOnClick: true,
        position: "top-center",
      });

      console.error("Error 500:", error.response.data);
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
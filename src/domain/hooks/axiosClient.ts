// src/lib/axiosClient.ts
import axios from "axios";
import { queryClient } from "../.."; // or wherever you initialize React Query

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// global interceptor for expired sessions
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Clear cached user
      queryClient.removeQueries({ queryKey: ["currentUser"] });

      // Optionally redirect (only if not already on login)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

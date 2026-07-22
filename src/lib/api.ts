import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");

      useAuthStore.getState().clearUser();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// request logger
api.interceptors.request.use((config) => {
  console.log("[Request]", {
    url: config.url,
    method: config.method,
    params: config.params,
    data: config.data,
  });

  return config;
})

// reponse logger
api.interceptors.response.use(
  (response) => {
    console.log("[Response]", {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data,
    });

    return response;
  },
  (error) => {
    if (error.response) {
      console.error("[Response Error]", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error("[Network Error]", error.message);
    }

    return Promise.reject(error);
  }
);
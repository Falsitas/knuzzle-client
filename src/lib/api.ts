import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.request.use((config) => {
  console.log("[Request]", {
    url: config.url,
    method: config.method,
    params: config.params,
    data: config.data,
  });

  return config;
})

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
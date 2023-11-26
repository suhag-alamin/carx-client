import axios from "axios";

const instance = axios.create({
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// request interceptor

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("idToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export { instance as axiosInstance };

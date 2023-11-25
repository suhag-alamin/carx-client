const { default: axios } = require("axios");

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Content-Type"] = "application/json";
instance.defaults.timeout = 60000;

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

import axios from "axios";

const api = axios.create({
  baseURL: "http://diplomovka.site/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const request = {
  get: (url, config) => {
    return api.get(url, config);
  },
  post: (url, data, config) => {
    return api.post(url, data, config);
  },
  put: (url, data, config) => {
    return api.put(url, data, config);
  },
  delete: (url, config) => {
    return api.delete(url, config);
  },
};

export default request;

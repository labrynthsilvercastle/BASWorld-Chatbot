import axios from "axios";
import getToken from "./utils/getToken";

const httpCommons = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  }
});

httpCommons.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpCommons;

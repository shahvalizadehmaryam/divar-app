import axios from "axios";
import { getCookie } from "utils/cookie";
import { getNewToken } from "services/token";
import { setCookie } from "../utils/cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// set token to requests
api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await getNewToken();
      // if res doesn't have response just return.
      if (!res?.response) return;
      // new tokens set to cookies.
      setCookie(res.response.data);
      //sent back this request.
      return api(originalRequest);
    }
  }
);
export default api;

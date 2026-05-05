import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("vithara_admin_token", token);
    } else {
      localStorage.removeItem("vithara_admin_token");
    }
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("vithara_admin_token");
  }

  return null;
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Use this for most pages:
// const data = await apiRequest("/admin/stats");
export const apiRequest = async (url, options = {}) => {
  const response = await axiosClient({
    url,
    method: options.method || "GET",
    data: options.body || options.data,
    params: options.params,
  });

  return response.data;
};

export default axiosClient;
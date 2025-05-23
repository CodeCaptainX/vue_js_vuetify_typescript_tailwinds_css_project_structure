import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
// import { sonnerToast } from "./util";
const baseUrl = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  const locale = localStorage.getItem("locale") || "en";
  const authStore = useAuthStore();
  config.withCredentials = false;
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  } else {
    authStore.logout();
    router.push("/login");
  }
  config.headers["Accept-Language"] = locale;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const authStore = useAuthStore();
    if (error.response.status === 401 || error.response.status === 422) {
      authStore.logout();
      // authStore.message = "Login session expired"
      // sonnerToast('', 'Login session expired', 'expired')
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;

import { defineStore } from "pinia";
import axios from "axios";
import { sonnerToast } from "@/utils/utils";

interface LoginPayloadRequest {
  auth: {
    username: string;
    password: string;
  };
}

interface AuthStates {
  token: string | null;
  message: string;
  loading: boolean;
  isLogout: boolean;
}

const baseUrl = import.meta.env.VITE_BASE_URL;
// const locale = localStorage.getItem('locale') || 'en'
export const useAuthStore = defineStore("auth", {
  state: (): AuthStates => ({
    token: localStorage.getItem("authToken"),
    message: "",
    loading: false,
    isLogout: true,
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.token;
    },
  },

  actions: {
    async login(payload: LoginPayloadRequest) {
      this.loading = true;
      this.message = "";
      try {
        const response = await axios.post(
          baseUrl + "/admin/auth/login",
          payload,
          {
            headers: {
              "Accept-Language": "en",
            },
          }
        );
        const tokenResponse = response.data.data.auth.token;
        const messageResponse = response.data.message;
        this.token = tokenResponse;
        this.message = messageResponse;
        sonnerToast("", messageResponse, "login");

        if (tokenResponse) {
          localStorage.setItem("authToken", tokenResponse);
          this.isLogout = false;
        } else {
          this.token = null;
          localStorage.removeItem("authToken");
          this.message = messageResponse || "Login failed. Please try again.";
          sonnerToast(
            "",
            messageResponse || "Login failed. Please try again.",
            "error"
          );
        }

        return response;
      } catch (error: any) {
        console.error("Login failed:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.message = error.response.data.message;
          sonnerToast("", error.response.data.message, "error");
          this.isLogout = false;
        } else {
          sonnerToast("", "Login failed. Please try again.", "error");
          this.message = "Login failed. Please try again.";
        }
        this.token = null;
        localStorage.removeItem("authToken");
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.isLogout = true;
      this.message = "Logged out successfully.";
      localStorage.removeItem("authToken");
    },
  },
});

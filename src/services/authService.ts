import { TokenService } from "./tokenService";
import { LoginCredentials, LoginResponse } from "../store/types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const AuthService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", // Важно для работы с httpOnly cookies
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();

      // Сохраняем токены
      if (data.accessToken && data.refreshToken) {
        TokenService.setTokens(data.accessToken, data.refreshToken);
      }

      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  },

  refresh: async (): Promise<{ accessToken: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include", // Для отправки refreshToken в куки
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();

      if (data.accessToken) {
        document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict; max-age=3600`;
      }

      return data;
    } catch (error) {
      throw new Error("Token refresh failed");
    }
  },

  logout: async (): Promise<void> => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      TokenService.removeTokens();
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
};

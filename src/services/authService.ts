import { LoginCredentials, LoginResponse, UserData } from "../store/types";
import { TokenService } from "./tokenService";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:44338";

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(
      `${API_URL}/${credentials.companyName}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Authentication failed");
    }

    const data = await response.json();
    TokenService.setToken(data.accessToken);
    return data;
  }

  static async getUserData(): Promise<UserData> {
    const response = await fetch(`${API_URL}/api/Client/get-user-info`, {
      headers: {
        Authorization: TokenService.getAuthHeader() || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user data");
    }

    return response.json();
  }

  static logout(): void {
    TokenService.clearToken();
  }

  static async fetchWithAuth(url: string, options: RequestInit = {}) {
    const headers = {
      ...options.headers,
      Authorization: TokenService.getAuthHeader() || "",
      "Content-Type": "application/json",
    };

    return fetch(url, {
      ...options,
      headers,
    });
  }
}

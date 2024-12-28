import { LoginCredentials, LoginResponse } from "../store/types";

export const loginAPI = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  try {
    const response = await fetch("YOUR_API_ENDPOINT/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data: LoginResponse = await response.json();

    if (credentials.rememberMe) {
      localStorage.setItem("authToken", data.token);
    } else {
      sessionStorage.setItem("authToken", data.token);
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An error occurred during login",
    );
  }
};

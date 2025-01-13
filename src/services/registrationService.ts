import { UserRegistrationData } from "../store/types/registration.types";

class RegistrationService {
  async register(userData: UserRegistrationData) {
    const { companyName, ...registrationData } = userData;

    const API_URL = import.meta.env.VITE_API_URL || "https://localhost:44338";

    const response = await fetch(
      `${API_URL}/${companyName}/user-registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return response.json();
  }

  saveUserPreferences(email: string, companyName: string) {
    localStorage.setItem("rememberedEmail", email);
    localStorage.setItem("rememberedCompany", companyName);
  }

  getUserPreferences() {
    return {
      email: localStorage.getItem("rememberedEmail"),
      companyName: localStorage.getItem("rememberedCompany"),
    };
  }

  clearUserPreferences() {
    localStorage.removeItem("rememberedEmail");
    localStorage.removeItem("rememberedCompany");
  }
}

export const registrationService = new RegistrationService();

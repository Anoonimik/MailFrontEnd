export class TokenService {
  private static TOKEN_KEY = "accessToken";
  private static REMEMBER_ME_KEY = "rememberMe";

  static setToken(token: string, rememberMe: boolean = false): void {
    console.log(rememberMe);
    if (rememberMe) {
      // Если remember me включен, сохраняем в localStorage
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.REMEMBER_ME_KEY, "true");
    } else {
      // Если remember me выключен, сохраняем в sessionStorage
      sessionStorage.setItem(this.TOKEN_KEY, token);
      localStorage.removeItem(this.REMEMBER_ME_KEY);
    }
    this.setAuthHeader(token);
  }

  static getToken(): string | null {
    // Сначала проверяем sessionStorage
    const sessionToken = sessionStorage.getItem(this.TOKEN_KEY);
    if (sessionToken) {
      return sessionToken;
    }

    // Если в sessionStorage нет, проверяем localStorage
    const localToken = localStorage.getItem(this.TOKEN_KEY);
    if (localToken) {
      // Если нашли токен в localStorage, проверяем флаг remember me
      const rememberMe = localStorage.getItem(this.REMEMBER_ME_KEY);
      if (rememberMe) {
        return localToken;
      }
      // Если флага нет, удаляем токен из localStorage
      this.clearToken();
      return null;
    }

    return null;
  }
  static clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REMEMBER_ME_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.removeAuthHeader();
  }

  static setAuthHeader(token: string): void {
    window.localStorage.setItem("authHeader", `Bearer ${token}`);
  }
  static removeAuthHeader(): void {
    window.localStorage.removeItem("authHeader");
  }

  static getAuthHeader(): string | null {
    return window.localStorage.getItem("authHeader");
  }

  static isRememberMe(): boolean {
    return localStorage.getItem(this.REMEMBER_ME_KEY) === "true";
  }
}

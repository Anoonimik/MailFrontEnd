export class TokenService {
  private static TOKEN_KEY = "accessToken";

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log("Token set", token);
    this.setAuthHeader(token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
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
}

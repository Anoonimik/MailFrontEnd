export interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  user: {
    email: string;
  };
  token: string;
}

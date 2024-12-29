export interface LoginCredentials {
  companyName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  role: string;
  accessToken: string;
  nickname: string;
  email: string;
}

export interface AuthState {
  user: {
    id: string;
    role: string;
    nickname: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
  initialized: boolean;
  error: string | null;
}

export interface UserData {
  id: string;
  role: string;
  nickname: string;
  email: string;
}

export interface UserRegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
}

export interface RegistrationState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

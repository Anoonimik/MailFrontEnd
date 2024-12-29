import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials } from "../types";
import { AuthService } from "../../services/authService";
import { TokenService } from "../../services/tokenService";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,
  error: null,
};

export const initializeAuth = createAsyncThunk("auth/initialize", async () => {
  const token = TokenService.getToken();
  console.log("Token found:", token);
  if (!token) {
    TokenService.clearToken();
    throw new Error("No token found");
  }

  try {
    TokenService.setAuthHeader(token);
    const userData = await AuthService.getUserData();
    return userData;
  } catch (error) {
    TokenService.clearToken();
    throw error;
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials) => {
    return await AuthService.login(credentials);
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      AuthService.logout();
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Initialize auth
    builder.addCase(initializeAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.initialized = true;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(initializeAuth.rejected, (state) => {
      state.loading = false;
      state.initialized = true;
      state.isAuthenticated = false;
      state.user = null;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.id,
        role: action.payload.role,
        nickname: action.payload.nickname,
        email: action.payload.email,
      };
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.error.message || "Authentication failed";
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectAuthInitialized = (state: { auth: AuthState }) =>
  state.auth.initialized;

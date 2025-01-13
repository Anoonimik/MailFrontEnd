import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  RegistrationState,
  UserRegistrationData,
} from "../types/registration.types";
import { registrationService } from "../../services/registrationService.ts";

const initialState: RegistrationState = {
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (userData: UserRegistrationData, { rejectWithValue }) => {
    try {
      const response = await registrationService.register(userData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Registration failed. Please try again.");
    }
  },
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetRegistration } = registrationSlice.actions;

export const selectRegistrationLoading = (state: {
  registration: RegistrationState;
}) => state.registration.loading;
export const selectRegistrationError = (state: {
  registration: RegistrationState;
}) => state.registration.error;
export const selectRegistrationSuccess = (state: {
  registration: RegistrationState;
}) => state.registration.success;

export default registrationSlice.reducer;

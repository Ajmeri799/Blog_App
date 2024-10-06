import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the initial state and the user data
interface UserData {
  name: string;
  email: string;
}

interface AuthState {
  status: boolean;
  userData: UserData | null;
}

// Initialize the state with proper types
const initialState: AuthState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

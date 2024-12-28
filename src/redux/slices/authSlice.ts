import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, verifyToken } from "../actions/authAction";


interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
    errorToken: string | null;
    isAuthenticated: boolean;
    status: "idle" | "loading" | "failed";
}
  
  const initialState: AuthState = {
    token: null,
    loading: false,
    error: null,
    errorToken: null,
    isAuthenticated: false,
    status: "idle",
  };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.status = "loading";
    })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string  }>) => {
        state.token = action.payload.token;
        state.loading = false;
        state.isAuthenticated = true;
        state.status = "idle";
    })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
        console.log('login error:', state.error);
        state.isAuthenticated = false;
        state.status = "failed";
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Logout failed";
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(verifyToken.pending, (state) => {
        state.status = "loading";
        state.errorToken = null;
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.status = "idle";
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.status = "failed";
        state.errorToken = action.error.message || "Token verification failed";
        state.loading = false;
        state.isAuthenticated = false;
      })
  },
});

export default authSlice.reducer;

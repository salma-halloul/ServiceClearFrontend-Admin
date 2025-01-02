import { createSlice } from '@reduxjs/toolkit';
import {  getProfile, resetPassword, updateProfile } from '../actions/userAction';
import { User } from '@/types/user';

interface UserState {
  users: User[];
  user?: User | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  status: "idle",
};


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.status = "idle";
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch profile';
        state.status = "failed";
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update profile';
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to reset password';
      });
  },
});

export default userSlice.reducer;

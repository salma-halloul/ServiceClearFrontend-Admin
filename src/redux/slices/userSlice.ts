import { createSlice } from '@reduxjs/toolkit';
import {  getProfile } from '../actions/userAction';

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
  },
});

export default userSlice.reducer;

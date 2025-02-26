import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const login = createAsyncThunk(
    'auth/login',
    async ({ identifier, password }: { identifier: string; password: string }, thunkAPI) => {
      try {
        const response = await axiosInstance.post('/auth/login', { identifier, password });
        console.log('response data token:', response.data.token);
        Cookies.set('sessionId_sc', response.data.token, { expires: 30 }); 
        return response.data.token;
      } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
      }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  Cookies.remove('sessionId_sc');
  return true;
}
);

export const verifyToken = createAsyncThunk(
  'auth/verify-token',
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/auth/verify-token', { token });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
});

  
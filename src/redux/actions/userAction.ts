import axiosInstance from "@/api/axiosInstance";
import { ResetPasswordPayload, updateUser } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/user/getprofile');
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
);

export const updateProfile = createAsyncThunk(
  'user/updateprofile',
  async (user : updateUser, thunkAPI) => {
    try {
      const response = await axiosInstance.put('/user/updateprofile', user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);


export const resetPassword = createAsyncThunk(
  'user/resetpassword',
  async (password : ResetPasswordPayload, thunkAPI) => {
    try {
      const response = await axiosInstance.put('/user/resetpassword', password);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

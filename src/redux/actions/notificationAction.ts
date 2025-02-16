import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotification = createAsyncThunk(
    '/notification/all',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/notification/getall');
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
);

export const markAllAsRead = createAsyncThunk(
    'notification/markAsRead',
    async (_, thunkAPI) => {
        try {
        const response = await axiosInstance.patch(`/notification/read-all`);
        return response.data;
      } catch (error:any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);      }
    }
);  

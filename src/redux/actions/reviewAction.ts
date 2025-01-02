import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

  export const fetchReviews = createAsyncThunk(
    '/review/all',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/review/all');
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
);

export const updateReview = createAsyncThunk(
  '/review/update',
  async (review: any, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/review/update-status`, review);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const addReview = createAsyncThunk(
  '/review/add',
  async (review: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/review/add`, review);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteMultipleReviews = createAsyncThunk(
  'reviews/deleteReviews',
  async (ids: string[], thunkAPI) => {
    try {
      const response = await axiosInstance.delete('/review/delete', { data: { ids } });
      console.log('API response:', response); 

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error deleting reviews';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
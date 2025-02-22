import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const now = Date.now();

    if (state.review.lastFetched && now - state.review.lastFetched < 60000) {
      return rejectWithValue("Reviews already up-to-date");
    }

    try {
      const response = await axiosInstance.get("/review/all");
      return { data: response.data, lastFetched: now };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
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
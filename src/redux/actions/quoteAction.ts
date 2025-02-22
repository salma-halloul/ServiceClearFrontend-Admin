import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchQuotes = createAsyncThunk(
  "quotes/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const now = Date.now();

    if (state.quote.lastFetched && now - state.quote.lastFetched < 60000) {
      return rejectWithValue("Quotes already up-to-date");
    }

    try {
      const response = await axiosInstance.get("/quote/getall");
      return { data: response.data, lastFetched: now };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch quotes");
    }
  }
);

export const getQuoteById = createAsyncThunk(
    '/quote/get',
    async (id: string, thunkAPI) => {
        try {
        const response = await axiosInstance.get(`/quote/${id}`);
        return response.data;
        } catch (error: any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const deleteMultipleQuotes = createAsyncThunk(
    'products/deleteQuotes',
    async (ids: string[], thunkAPI) => {
      try {
        const response = await axiosInstance.delete('/quote/delete', { data: { ids } });
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error deleting Quotes';
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
);

export const updateQuoteReadStatus = createAsyncThunk(
  'Quotes/updateReadStatus',
  async ({ id, read }: { id: string; read: boolean }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/quote/update`, { id, read });
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message || 'Failed to update quote read status');
    }
  }
);

export const updateQuote = createAsyncThunk(
  '/quote/update',
  async (review: any, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/quote/update-status`, review);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchMonthlyRequestStatistics = createAsyncThunk(
  'quote/fetchMonthlyRequestStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/quote/monthly-request');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
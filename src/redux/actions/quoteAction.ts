import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuotes = createAsyncThunk(
    '/quote/all',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/quote/getall');
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
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
  'Quotes/update',
  async ({ id, read }: { id: string; read: boolean }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/quote/update`, { id, read });
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message || 'Failed to update quote read status');
    }
  }
);
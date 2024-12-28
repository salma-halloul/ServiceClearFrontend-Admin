import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
    '/contact/all',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/contact/getall');
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
);

export const getContactById = createAsyncThunk(
    '/contact/get',
    async (id: string, thunkAPI) => {
        try {
        const response = await axiosInstance.get(`/contact/${id}`);
        return response.data;
        } catch (error: any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const deleteMultipleContacts = createAsyncThunk(
    'products/deleteContacts',
    async (ids: string[], thunkAPI) => {
      try {
        const response = await axiosInstance.delete('/contact/delete', { data: { ids } });
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error deleting contacts';
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
);

export const updateContactReadStatus = createAsyncThunk(
  'contacts/update',
  async ({ id, read }: { id: string; read: boolean }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/contact/update`, { id, read });
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data.message || 'Failed to update contact read status');
    }
  }
);
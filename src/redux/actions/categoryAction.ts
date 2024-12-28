import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
    'categories/fetchAll',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/category/all');
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
);

export const createCategory = createAsyncThunk(
  'category/create',
  async (category: CreateCategory, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/category/create', category);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/category/delete/${id}`);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
}
);

export const updateCategory = createAsyncThunk(
'category/update',
async (category: Category, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`/category/update/${category.id}`, category);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
}
);
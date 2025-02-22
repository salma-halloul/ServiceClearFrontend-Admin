import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const now = Date.now();

    if (state.service.lastFetched && now - state.service.lastFetched < 60000) {
      return rejectWithValue("Services already up-to-date");
    }

    try {
      const response = await axiosInstance.get("/service/getall");
      return { data: response.data, lastFetched: now };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch services");
    }
  }
);

export const createService = createAsyncThunk(
  'service/create',
  async (serviceData: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/service/create', serviceData);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create service';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


export const updateService = createAsyncThunk(
  'service/update',
  async (service: any, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/service/update/${service.id}`, service);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  'service/fetchById',
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/service/${id}`);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch service';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteMultipleServices = createAsyncThunk(
  'services/deleteServices',
  async (ids: string[], thunkAPI) => {
    try {
      const response = await axiosInstance.delete('/service/delete', { data: { ids } });
      console.log('API response:', response); // Log pour vérifier la réponse de l'API

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error deleting services';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
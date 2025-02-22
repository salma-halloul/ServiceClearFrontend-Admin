import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchNotification = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState; // Utilisation du RootState pour éviter les erreurs
    const now = Date.now();

    // Vérifie si les notifications ont été récupérées récemment (moins de 60s)
    if (state.notification.lastFetched && now - state.notification.lastFetched < 60000) {
      return rejectWithValue("Notifications already up-to-date");
    }

    try {
      const response = await axiosInstance.get("/notification/getall");
      return { data: response.data, lastFetched: now }; // Retourne aussi lastFetched
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch notifications");
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

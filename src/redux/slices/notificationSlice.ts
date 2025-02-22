import { createSlice } from '@reduxjs/toolkit';
import { fetchNotification, markAllAsRead } from '../actions/notificationAction';

interface NotificationState {
  notifications: Notification[];
  notification: Notification | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
  lastFetched : number | null;
}

const initialState: NotificationState = {
  notifications: [],
  notification: null,
  loading: false,
  error: null,
  status: "idle",
  lastFetched: null
};


const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updateNotificationsStateAsRead: (state) => {
      state.notifications = state.notifications.map(notification => ({
        ...notification,
        read: true
      }));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.data;
        state.lastFetched = action.payload.lastFetched; // Mise à jour de lastFetched
        state.status = "idle";
      })
      .addCase(fetchNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch notifications';
        state.status = "failed";
      })
      .addCase(markAllAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(markAllAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
        state.status = "idle";
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to mark notification as read';
        state.status = "failed";
      })
    }

});

export const { updateNotificationsStateAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;

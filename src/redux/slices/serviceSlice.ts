import { createSlice } from '@reduxjs/toolkit';
import { createService, deleteMultipleServices, fetchServiceById, fetchServices, updateService } from '../actions/serviceAction';
import { Service } from '@/types/service';

interface ServiceState {
  services: Service[];
  service: Service | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ServiceState = {
  services: [],
  service: null,
  loading: false,
  error: null,
  status: "idle",
};


const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        state.status = "idle";
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch service';
        state.status = "failed";
      })
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data;
        state.status = "idle";
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
        state.status = "failed";
      })
      .addCase(createService.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.status = "idle";
        state.services.push(action.payload);
        state.loading = false;
      })
      .addCase(createService.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex((service) => service.id === action.payload.id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
        state.status = "idle";
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update service';
        state.status = "failed";
      })
      .addCase(deleteMultipleServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleServices.fulfilled, (state, action) => {
        state.loading = false;
    
        console.log('deleteMultipleServices fulfilled'); // Log pour vérifier si le bloc fulfilled est exécuté
        console.log('Payload:', action.payload); // Log pour vérifier la structure du payload
    
        if (Array.isArray(action.payload.ids) && action.payload.ids.every((id: string) => typeof id === 'string')) {
            state.services = state.services.filter(service => !action.payload.ids.includes(service.id));
        } else {
            state.error = 'Invalid payload structure';
        }
    })
      .addCase(deleteMultipleServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete service';
      });
  },
});

export default serviceSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { addReview, fetchReviews, updateReview } from '../actions/reviewAction';

interface ReviewState {
  reviews: any[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
  status: "idle",
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";

      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.status = "idle";
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch reviews';
        state.status = "failed";
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "idle";
        const index = state.reviews.findIndex(review => review.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update review';
        state.status = "failed";
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";

      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
        state.status = "idle";
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to add review';
        state.status = "failed";
      });




  },
});

export default reviewSlice.reducer;
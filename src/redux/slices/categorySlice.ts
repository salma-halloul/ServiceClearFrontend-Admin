import { createSlice } from '@reduxjs/toolkit';
import {countCategoriesInQuotes, createCategory, deleteCategory, fetchAllCategories, updateCategory } from '../actions/categoryAction';

interface CategoryState {
  categories: Category[];
  categoriesInQuotes: CategoryCount[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: CategoryState = {
  categories: [],
  categoriesInQuotes: [],
  loading: false,
  error: null,
  status: "idle",
};


const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
        state.status = "failed";
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.status = "idle";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create category';
        state.status = "failed";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(category => category.id !== action.payload.id);
        state.status = "idle";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete category';
        state.status = "failed";
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.status = "idle";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update category';
        state.status = "failed";
      })
      .addCase(countCategoriesInQuotes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(countCategoriesInQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesInQuotes = action.payload;
        state.status = "idle";
      })
      .addCase(countCategoriesInQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories In Quotes';
        state.status = "failed";
      })
      
  },
});

export default categorySlice.reducer;

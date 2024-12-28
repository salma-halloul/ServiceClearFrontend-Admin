import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteMultipleQuotes, fetchQuotes, getQuoteById, updateQuoteReadStatus } from '../actions/quoteAction';

interface QuoteState {
  quotes: Quote[];
  quote: Quote | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: QuoteState = {
  quotes: [],
  quote: null,
  loading: false,
  error: null,
  status: "idle",
};


const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuoteById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getQuoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.quote = action.payload;
        state.status = "idle";
      })
      .addCase(getQuoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch quote';
        state.status = "failed";
      })
      .addCase(fetchQuotes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes = action.payload;
        state.status = "idle";
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch quotes';
        state.status = "failed";
      })
      .addCase(deleteMultipleQuotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleQuotes.fulfilled, (state, action) => {
        state.loading = false;
    
        console.log('deleteMultipleQuotes fulfilled'); // Log pour vérifier si le bloc fulfilled est exécuté
        console.log('Payload:', action.payload); // Log pour vérifier la structure du payload
    
        if (Array.isArray(action.payload.ids) && action.payload.ids.every((id: string) => typeof id === 'string')) {
            state.quotes = state.quotes.filter(quote => !action.payload.ids.includes(quote.id));
        } else {
            state.error = 'Invalid payload structure';
        }
    })
    .addCase(deleteMultipleQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete quote';
    })
    .addCase(updateQuoteReadStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateQuoteReadStatus.fulfilled, (state, action: PayloadAction<Quote>) => {
      state.loading = false;
      const updatedQuote = action.payload;
      const index = state.quotes.findIndex((quote) => quote.id === updatedQuote.id);
      if (index !== -1) {
        state.quotes[index] = updatedQuote;
      }
    })
    .addCase(updateQuoteReadStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to update quote read status';
    })
  }

});

export default quoteSlice.reducer;

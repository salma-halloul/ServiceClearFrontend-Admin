import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteMultipleQuotes, fetchMonthlyRequestStatistics, fetchQuotes, getQuoteById, updateQuote, updateQuoteReadStatus } from '../actions/quoteAction';
import { Quote } from '@/types/quote';

interface QuoteState {
  quotes: Quote[];
  quote: Quote | null;
  monthlyRequest : any;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: QuoteState = {
  quotes: [],
  quote: null,
  monthlyRequest: null,
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
            state.quotes = state.quotes.filter((quote: { id: any; }) => !action.payload.ids.includes(quote.id));
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
      const index = state.quotes.findIndex((quote: { id: any; }) => quote.id === updatedQuote.id);
      if (index !== -1) {
        state.quotes[index] = updatedQuote;
      }
    })
    .addCase(updateQuoteReadStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to update quote read status';
    })
     .addCase(updateQuote.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = "loading";
          })
          .addCase(updateQuote.fulfilled, (state, action) => {
            state.loading = false;
            state.status = "idle";
            const index = state.quotes.findIndex((quote: { id: string; })  => quote.id === action.payload.id);
            if (index !== -1) {
              state.quotes[index] = action.payload;
            }
          })
          .addCase(updateQuote.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || 'Failed to update review';
            state.status = "failed";
          })
          .addCase(fetchMonthlyRequestStatistics.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = "loading";
          })
          .addCase(fetchMonthlyRequestStatistics.fulfilled, (state, action) => {
            state.loading = false;
            state.monthlyRequest = action.payload;
            state.status = "idle";
          })
          .addCase(fetchMonthlyRequestStatistics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.status = "failed";
          })
  }

});

export default quoteSlice.reducer;

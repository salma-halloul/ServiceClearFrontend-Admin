import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from "./slices/authSlice";
import productReducer from "./slices/serviceSlice";
import categoryReducer from "./slices/categorySlice";
import userReducer from "./slices/userSlice";
import reviewReducer from "./slices/reviewSlice";
import contactReducer from "./slices/contactSlice";
import devisReducer from "./slices/quoteSlice";


const store = configureStore({  
    reducer: {
      auth: authReducer,
      product: productReducer,
      category: categoryReducer,
      user : userReducer,
      review : reviewReducer,
      contact : contactReducer,
      devis : devisReducer,
    },
  });
  
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

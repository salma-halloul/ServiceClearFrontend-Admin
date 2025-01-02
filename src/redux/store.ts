import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from "./slices/authSlice";
import serviceReducer from "./slices/serviceSlice";
import categoryReducer from "./slices/categorySlice";
import userReducer from "./slices/userSlice";
import reviewReducer from "./slices/reviewSlice";
import contactReducer from "./slices/contactSlice";
import quoteReducer from "./slices/quoteSlice";


const store = configureStore({  
    reducer: {
      auth: authReducer,
      service: serviceReducer,
      category: categoryReducer,
      user : userReducer,
      review : reviewReducer,
      contact : contactReducer,
      quote : quoteReducer,
    },
  });
  
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

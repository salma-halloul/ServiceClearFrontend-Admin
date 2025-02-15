import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from "./slices/authSlice";
import serviceReducer from "./slices/serviceSlice";
import categoryReducer from "./slices/categorySlice";
import userReducer from "./slices/userSlice";
import reviewReducer from "./slices/reviewSlice";
import contactReducer from "./slices/contactSlice";
import quoteReducer from "./slices/quoteSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Utilisation de localStorage
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer,
  category: categoryReducer,
  user: userReducer,
  review: reviewReducer,
  contact: contactReducer,
  quote: quoteReducer,
});

// Configuration de redux-persist
const persistConfig = {
  key: "root", // Clé de stockage
  storage,     // Type de stockage (localStorage)
  whitelist: ["category", "service", "quote", "contact", "review"], // Persiste uniquement ces slices (optionnel)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure le store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Actions redux-persist ignorées
      },
    }),
});

export const persistor = persistStore(store); // Crée le persistor
  
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

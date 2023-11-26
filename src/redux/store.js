import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: persistedCartReducer,
    [api.reducerPath]: api.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export const persistor = persistStore(store);

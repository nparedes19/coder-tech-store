import { configureStore } from "@reduxjs/toolkit";
import shopSlice from '../features/shop/shopSlice'
import {shopApi}  from '../services/shopService'
import cartSlice  from "../features/cart/cartSlice";
import { receiptApi } from "../services/receiptsService";
import { authApi } from "../services/authService";
import  authSlice  from "../features/auth/authSlice";

export const store = configureStore({
    reducer:{
        shopSlice,
        cartSlice,
        authSlice,
        [shopApi.reducerPath] : shopApi.reducer,
        [receiptApi.reducerPath] : receiptApi.reducer,
        [authApi.reducerPath] : authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware).concat(receiptApi.middleware).concat(authApi.middleware)
})
import { configureStore } from "@reduxjs/toolkit";
import shopSlice from '../features/shop/shopSlice'
import {shopApi}  from '../services/shopService'
import cartSlice  from "../features/cart/cartSlice";

export const store = configureStore({
    reducer:{
        shopSlice,
        cartSlice,
        [shopApi.reducerPath] : shopApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware)
})
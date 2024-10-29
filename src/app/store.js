import { configureStore } from "@reduxjs/toolkit";
import shopSlice from '../features/shop/shopSlice'
import {shopApi}  from '../services/shopService'
import cartSlice  from "../features/cart/cartSlice";
import { receiptApi } from "../services/receiptsService";

export const store = configureStore({
    reducer:{
        shopSlice,
        cartSlice,
        [shopApi.reducerPath] : shopApi.reducer,
        [receiptApi.reducerPath] : receiptApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware).concat(receiptApi.middleware)
})
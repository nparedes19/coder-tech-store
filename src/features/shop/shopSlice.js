import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            categorySelected:'',
            productSelected: null,
        }
    },
    reducers: {
        setCategory : (state,action) => {
            state.value.categorySelected = action.payload
        },
        setProduct : (state,action) => {
            state.value.productSelected = action.payload
        }
    }
})

export const {setCategory,setProduct} = shopSlice.actions

export default shopSlice.reducer
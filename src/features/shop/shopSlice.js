import { createSlice } from "@reduxjs/toolkit";
import categories from '../../data/categories.json'
import products from '../../data/products.json'

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            categories: categories,
            products: products,
            categorySelected:'',
            productsFiltered: [],
            productSelected: null,
            productShown: []
        }
    },
    reducers: {
        setCategory : (state,action) => {
            state.value.productsFiltered = products.filter (product => product.category.toLocaleLowerCase() === action.payload.toLocaleLowerCase())
            state.categorySelected = action.payload
        },
        setProduct : (state,action) => {
            state.value.productShown = products.filter (product => product.id === action.payload)
            state.value.productSelected = action.payload
        }
    }
})

export const {setCategory,setProduct} = shopSlice.actions

export default shopSlice.reducer
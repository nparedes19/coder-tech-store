import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "../../utils/functions";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            cartItems:[],
            user:"demo",
            total: null,
            updateAt: Date.now().toLocaleString()
        }
    },
    reducers: {
        addItem: (state,action)=>{
            const productInCart = state.value.cartItems.find(item=>item.id===action.payload.id)
            if(!productInCart){
                state.value.cartItems.push(action.payload)
            }else{
                state.value.cartItems.map(item=>{
                    if(item.id===action.payload.id){
                        item.quantity += 1
                        return item
                    }
                    return item
                })
            }

            const total = calculate_total_price(state.value.cartItems)

            state.value = {
                ...state.value,
                total, 
                updatedAt: new Date().toLocaleString()
            }

        },
        removeItem: (state, action) => {
            const cartItems = state.value.cartItems.filter(item => item.id !== action.payload.id);
            const total = calculate_total_price(cartItems);
            
            state.value = {
                ...state.value,
                cartItems,
                total,
            };
        },
        clearCart: (state) => {
            state.value = {
                ...state.value,
                cartItems: [],
                total: 0,
            };
            return state;
        },
        lessQuantity: (state, action) => {
            state.value.cartItems.map(item=>{
                if(item.id===action.payload.id){
                    item.quantity -= 1
                    return item
                }
                return item
            })

            const total = calculate_total_price(state.value.cartItems)

            state.value = {
                ...state.value,
                total,
            };
        },
        moreQuantity: (state, action) => {
            state.value.cartItems.map(item=>{
                if(item.id===action.payload.id){
                    item.quantity += 1
                    return item
                }
                return item
            })

            const total = calculate_total_price(state.value.cartItems)

            state.value = {
                ...state.value,
                total,
            };
        }
    }
})

export const {addItem, removeItem,clearCart, lessQuantity, moreQuantity} = cartSlice.actions

export default cartSlice.reducer
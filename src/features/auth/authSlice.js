import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            email: "",
            token:""
        }
    },
    reducers: {
        setUser:(state,action) => {
            state.value.email = action.payload.email
            state.value.token = action.payload.idToken
        }
    }
})

export const {setUser} = authSlice.actions

export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            email: "",
            token:"",
            profilePicture: "",
            localId:""
        }
    },
    reducers: {
        setUser:(state,action) => {
            state.value.email = action.payload.email
            state.value.token = action.payload.idToken
            state.value.localId = action.payload.localId
        },
        setProfilePicture: (state, action) => {
            state.value.profilePicture = action.payload
        }
    }
})

export const {setUser, setProfilePicture} = authSlice.actions

export default authSlice.reducer
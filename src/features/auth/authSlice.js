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
        },
        clearUser: (state) => {
            state.value.email = null
            state.value.token = null
            state.value.localId = ""
            state.value.profilePicture = ""
        }
    }
})

export const {setUser, setProfilePicture, clearUser} = authSlice.actions

export default authSlice.reducer
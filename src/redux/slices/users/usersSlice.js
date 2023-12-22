import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import baseURL from "../../../utils/baseURL"
import { resetErrAction } from "../globalActions/globalActions";

//initial state 
const initialState = {
    loading: false,
    error: null,
    users: [],
    user: {},
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: localStorage.getItem("userInfo") ?
        JSON.parse(localStorage.getItem("userInfo")) : null,
    },
}

// login action
export const loginUserAction = createAsyncThunk(
    "users/login",
    async({email, password}, {rejectWithValue, getState, dispatch}) => {
        try {
            // http request
            const {data} = await axios.post(`${baseURL}users/login`, {
                email,
                password,
            });
            // save the data inside the storge
            localStorage.setItem('userInfo', JSON.stringify(data))
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data)
        }
    }
);
// register action
export const registerUserAction = createAsyncThunk(
    "users/register",
    async({fullName, email, password}, {rejectWithValue, getState, dispatch}) => {
        try {
            // http request
            const {data} = await axios.post(`${baseURL}users/register`, {
                fullName,
                email,
                password,
            });
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data)
        }
    }
);

// create slices
const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        // handle actions
        // login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userAuth.loading = true;
        })
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth.loading = false;
            state.userAuth.userInfo = action.payload;
        })
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userAuth.loading = false;
            state.userAuth.error = action.payload;
        })
        // register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // reset error action
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null;
        })
    },
});

// generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false
}

// create product action
export const createProductAction = createAsyncThunk(
    "product/create",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { name,
                description,
                category,
                sizes,
                colors,
                brand,
                price
            } = payload;
            // make request
            // token authentication
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const { data } = await axios.post(`${baseURL}product`, {
                name,
                description,
                category,
                sizes,
                colors,
                brand,
                price
            }, config)
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
);

// create product slice
const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        // create
        builder.addCase(createProductAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createProductAction.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.isAdded = true
        })
        builder.addCase(createProductAction.rejected, (state, action) => {
            state.loading = false;
            state.product = null;
            state.isAdded = false;
            state.error = action.payload;
        })
    },
});

// generate reducers
const productReducer = productSlice.reducer;

export default productReducer;
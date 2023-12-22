import { createAsyncThunk } from "@reduxjs/toolkit";


// reset error action
export const resetErrAction = createAsyncThunk("resetErrAction", () => {
    return {}
});

// reset success action
export const resetSuccessAction = createAsyncThunk("resetSuccessAction", () => {
    return {}
})
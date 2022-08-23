import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserLog } from "../../types";
import { AppDispatch, RootState } from "../index";

export interface UserLogsState {
    logs: UserLog[];
}

const initialState: UserLogsState = {
    logs: [],
};

export const loadUserLogs = createAsyncThunk<UserLog[]>(
    'userLogs/loadUserLogs',
    async () => {
        const response = await fetch('/logs.json')
        return response.json()
    }
)

export const UserLogsSlice = createSlice({
    name: "UserLogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadUserLogs.fulfilled, (state, action) => {
            state.logs = action.payload;
        })
    },
});

export const selectUserLogs = (state: RootState) => state.userLogs.logs;

export default UserLogsSlice.reducer;

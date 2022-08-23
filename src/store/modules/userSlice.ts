import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FormatedUserRecord, UserLog, UserRecords } from "../../types";
import { RootState } from "../index";

const TABLE_BASE_API_URL = 'https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users';
const API_KEY = 'key4v56MUqVr9sNJv';

export interface UsersState {
    userRecords: UserRecords;
    formatedUsers: FormatedUserRecord[],
    status: "idle" | "loading" | "failed" | "formatted";
}

const initialState: UsersState = {
    userRecords: {} as UserRecords,
    formatedUsers: [],
    status: "idle",
};

export const loadUsers = createAsyncThunk<UserRecords, { offset?: string }, { state: RootState }>(
    'userLogs/loadUsers',
    async (payload) => {

        const response = await fetch(`${TABLE_BASE_API_URL}?pageSize=6&view=Grid%20view${payload.offset ? '&offset=' + payload.offset : ''}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        })
        return response.json()
    }
)

export const UsersSlice = createSlice({
    name: "Users",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        sortUsers: (state, action: { payload: { order: string, target: string }, type: string }) => {
            state.formatedUsers = (state.formatedUsers.slice().sort((a, b) => {

                if (action.payload.order === "ASC") {

                    switch (action.payload.target) {
                        case "Name":
                            return a.Name.localeCompare(b.Name);
                        case "totalConversions":
                            return a.totalConversions - b.totalConversions;
                        case "totalImpresions":
                            return a.totalImpresions - b.totalImpresions;
                        case "totalRevenue":
                            return a.totalRevenue - b.totalRevenue;
                        default:
                            return 0;
                    }

                } else {

                    switch (action.payload.target) {
                        case "Name":
                            return b.Name.localeCompare(a.Name);
                        case "totalConversions":
                            return b.totalConversions - a.totalConversions;
                        case "totalImpresions":
                            return b.totalImpresions - a.totalImpresions;
                        case "totalRevenue":
                            return b.totalRevenue - a.totalRevenue;
                        default:
                            return 0;
                    }

                }
            }
            ));
        },
        formatUsers: (state, action: { payload: { userLogs: UserLog[] }, type: string }) => {
            if (!state.userRecords.records.length || !action.payload.userLogs.length) return;

            const formattedUsersMap: { [key: number]: FormatedUserRecord } = {};
            for (const user of state.userRecords.records) {
                formattedUsersMap[user.fields.Id] = { ...user.fields, totalConversions: 0, totalImpresions: 0, totalRevenue: 0, chartSummary: "", categories: [], series: [], conversionsMap: {} };
            }

            for (const userLog of action.payload.userLogs) {
                if (!formattedUsersMap[userLog.user_id]) continue;
                switch (userLog.type) {
                    case "impression":
                        formattedUsersMap[userLog.user_id].totalImpresions++;
                        break;

                    case "conversion": {

                        const date = userLog.time.split(" ")[0];

                        formattedUsersMap[userLog.user_id].conversionsMap[date] = (formattedUsersMap[userLog.user_id].conversionsMap[date] || 0) + 1;
                        formattedUsersMap[userLog.user_id].totalConversions++;
                        break;
                    }

                    default:
                        break;
                }
                formattedUsersMap[userLog.user_id].totalRevenue += userLog.revenue;
            }

            const formattedUsers: FormatedUserRecord[] = Object.values(formattedUsersMap);

            for (const user of formattedUsers) {
                user.categories = Object.keys(user.conversionsMap);
                user.categories.sort();
                user.series = user.categories.map((date) => user.conversionsMap[date]);

                const startDate = new Date(user.categories[0]);
                const endDate = new Date(user.categories[user.categories.length - 1]);
                user.chartSummary = `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`;
            }

            state.formatedUsers = formattedUsers;
            state.status = "formatted"
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(loadUsers.pending, (state) => {
                state.status = "loading";
            }).addCase(loadUsers.fulfilled, (state, action) => {
                const data = action.payload;
                state.userRecords = data;
            })
    },
});

export const { sortUsers, formatUsers } = UsersSlice.actions;

export const selectUsers = (state: RootState) => state.users.userRecords.records;
export const selectFormatedUsers = (state: RootState) => state.users.formatedUsers;
export const selectCurrentOffset = (state: RootState) => state.users.userRecords.offset;
export const selectCurrentStatus = (state: RootState) => state.users.status;

export default UsersSlice.reducer;

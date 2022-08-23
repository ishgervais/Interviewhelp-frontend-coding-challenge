import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './modules/userSlice';
import userLogsReducer from './modules/userLogsSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        userLogs: userLogsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
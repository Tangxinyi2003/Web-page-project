import { configureStore } from "@reduxjs/toolkit"
import logger from 'redux-logger'
import userReducer from './user/UserSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
})




import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './features/accountSlice'
import appointmentSlice from './features/appointmentSlice'
import busSlice from './features/busSlice'
import userSlice from './features/userSlice'
import requestSlice from './features/requestSlice'


export const store = configureStore({
    reducer: {
        account: accountSlice,
        appointment: appointmentSlice,
        bus: busSlice,
        user: userSlice,
        request: requestSlice
    },
})
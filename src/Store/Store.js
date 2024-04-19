
import { configureStore } from '@reduxjs/toolkit'
// import Login from './Reducer/Login'
import authSlice from "./Reducer/Login"

export const store = configureStore({
  reducer: {
    auth:authSlice,
  },
})

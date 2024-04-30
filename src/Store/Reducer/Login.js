import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
  };
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
      },
    },
  })

  export const { login, logout } = authSlice.actions;
  export default authSlice.reducer;
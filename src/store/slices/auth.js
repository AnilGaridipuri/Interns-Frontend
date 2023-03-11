import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username:"",
  _id:"",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication: (
      state,
      action
    ) => {
      state.username=action.payload.username;
      state._id=action.payload._id;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

// Export Reducers
export const { setAuthentication } = authSlice.actions;

export default authSlice.reducer;

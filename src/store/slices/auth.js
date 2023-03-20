import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  rollno: "",
  _id: "",
  studentName: "",
  year: "",
  branch: "",
  phoneNumber: "",
  mailId: "",
  profile: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.rollno = action.payload.rollno;
      state._id = action.payload._id;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.studentName = action.payload.studentName;
      state.year = action.payload.year;
      state.phoneNumber = action.payload.phoneNumber;
      state.mailId = action.payload.mailId;
      state.profile = action.payload.profile;
      state.branch = action.payload.branch;
    },
  },
});

// Export Reducers
export const { setAuthentication } = authSlice.actions;

export default authSlice.reducer;

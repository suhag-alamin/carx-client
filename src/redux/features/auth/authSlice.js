import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
  admin: {
    isAdmin: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    removeUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
    setAdmin: (state, action) => {
      state.admin.isAdmin = action.payload;
    },
    removeAdmin: (state) => {
      state.admin.isAdmin = false;
    },
  },
});

export const { setUser, removeUser, setAdmin, removeAdmin, toggleLoading } =
  authSlice.actions;

export default authSlice.reducer;

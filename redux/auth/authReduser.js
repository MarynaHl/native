import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickname: null,
  avatar: null,
  email: null,
  stateChange: false,
};

export const authSlise = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
      email: payload.email,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
  },
});

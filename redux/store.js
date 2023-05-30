import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlise } from "./auth/authReduser";

const rootReduser = combineReducers({
  [authSlise.name]: authSlise.reducer,
});

export const store = configureStore({
  reducer: rootReduser,
});

import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";

export const appStore = configureStore({
  reducer: {
    // giving slice to store
    dashboard: dashboardReducer,
  },
});



import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersclice"; // Import your slice reducer

export const store = configureStore({
  reducer: {
    user: userReducer, // key "user" matches slice name
  },
});

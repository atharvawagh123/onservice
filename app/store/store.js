import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersclice"; // Import your slice reducer
import Adminreducer from "./Adminslice";
import CategoriesSlice from "./Categoryslice";
import allUserReducer from "./allUserslice";
import servicesReducer from "./servicesSlice";
import subadminSlice from "./subAdminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    Admin: Adminreducer,
    Categories: CategoriesSlice,
    allUser: allUserReducer,
    services: servicesReducer,
    subadmin: subadminSlice,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  name: "",
  age: null,
  last_login: null,
  date_joined: "",
  islogin: false,
  category: [],
};

const AdminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setinfo(state, action) {
      return { ...state, ...action.payload };
    },
    setcategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setinfo, setcategory } = AdminSlice.actions;
export default AdminSlice.reducer;

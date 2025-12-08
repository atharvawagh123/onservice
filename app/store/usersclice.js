import { createSlice } from "@reduxjs/toolkit";

// Initial state, including token
const initialState = {
  id: null,
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  name: "",
  age: null,
  password: "",
  is_active: false,
  is_staff: false,
  is_superuser: false,
  last_login: null,
  date_joined: "",
  islogin: false,
  totalservice: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const payload = action.payload;
      state.id = payload.id ?? null;
      state.email = payload.email ?? "";
      state.username = payload.username ?? "";
      state.first_name = payload.first_name ?? "";
      state.last_name = payload.last_name ?? "";
      state.name = payload.name ?? "";
      state.age = payload.age ?? null;
      state.password = payload.password ?? "";
      state.is_active = payload.is_active ?? false;
      state.is_staff = payload.is_staff ?? false;
      state.is_superuser = payload.is_superuser ?? false;
      state.last_login = payload.last_login ?? null;
      state.date_joined = payload.date_joined ?? "";
    },
    clearUser(state) {
      Object.assign(state, initialState);
      localStorage.removeItem("token");
    },
    setloginstate(state, action) {
      state.islogin = action.payload;
    },
    settotalservice(state, action) {
      state.totalservice = action.payload;
    },
    setname(state,action){
      state.name = action.payload;
    }
  },
});

export const { setUser, clearUserk, setloginstate,settotalservice ,setname} = userSlice.actions;
export default userSlice.reducer;

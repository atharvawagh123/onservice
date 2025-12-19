import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  page: 1,
  limit: 1,
  totalUsers: 0,
  totalPages: 1,
  loading: false,
};

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload.users;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalUsers = action.payload.totalUsers;
      state.totalPages = action.payload.totalPages;
    },
    setpage(state, action) {
      state.page = action.payload;
    },
    setUserLimit(state, action) {
      state.limit = action.payload;
    },
    setchangeactivity(state, action) {
      const user = state.users.find(user => user.id === action.payload);
      if (!user) {
        alert('user not found in state');
      }
      user.is_active = !user.is_active;
    },
    nextPage(state) {
      if (state.page < state.totalPages) {
        state.page += 1;
      }
    },
    prevPage(state) {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    setloading(state) {
      state.loading = !state.loading;
    },
  },
});

export const {
  setUsers,
  setUserLimit,
  nextPage,
  prevPage,
  setchangeactivity,
  setpage,
  setloading,
} = allUsersSlice.actions;

export default allUsersSlice.reducer;

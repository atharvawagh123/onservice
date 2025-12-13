import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subadmins: [],

  // pagination + meta
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  hasMore: false,

  loading: false,
  error: null,
};

const subAdminSlice = createSlice({
  name: "subadmin",
  initialState,
  reducers: {
    // ✅ SET LIST (after GET API)
    setSubAdmins: (state, action) => {
      const { subadmins, page, limit, total, totalPages, hasMore } =
        action.payload;

      state.subadmins =
        page === 1 ? subadmins : [...state.subadmins, ...subadmins];

      state.page = page;
      state.limit = limit;
      state.total = total;
      state.totalPages = totalPages;
      state.hasMore = hasMore;
    },

    // ✅ ADD SUBADMIN
    addSubAdmin: (state, action) => {
      state.subadmins.unshift(action.payload);
      state.total += 1;
      state.totalPages = Math.ceil(state.total / state.limit);
    },

    // ✅ UPDATE SUBADMIN (edit profile etc.)
    updateSubAdmin: (state, action) => {
      const updated = action.payload;

      const index = state.subadmins.findIndex((item) => item.id === updated.id);

      if (index !== -1) {
        state.subadmins[index] = {
          ...state.subadmins[index],
          ...updated,
        };
      }
    },

    // ✅ DELETE SUBADMIN
    deleteSubAdmin: (state, action) => {
      const id = action.payload;

      state.subadmins = state.subadmins.filter((item) => item.id !== id);

      state.total -= 1;
      state.totalPages = Math.ceil(state.total / state.limit);
    },

    // ✅ TOGGLE ACTIVE / INACTIVE
    toggleSubAdminStatus: (state, action) => {
      const id = action.payload;

      const subadmin = state.subadmins.find((item) => item.id === id);

      if (subadmin) {
        subadmin.is_active = !subadmin.is_active;
      }
    },

    // optional helpers
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    resetSubAdmins: () => initialState,
  },
});

export const {
  setSubAdmins,
  addSubAdmin,
  updateSubAdmin,
  deleteSubAdmin,
  toggleSubAdminStatus,
  setLoading,
  setError,
  resetSubAdmins,
} = subAdminSlice.actions;

export default subAdminSlice.reducer;

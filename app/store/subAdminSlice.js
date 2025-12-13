import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subadmins: [],
  page: 1,
  limit: 2,
  total: 0,
  totalPages: 0,
};

const subAdminSlice = createSlice({
  name: "subadmin",
  initialState,
  reducers: {
    setSubAdmins: (state, action) => {
      state.subadmins = action.payload.subadmins || [];
      state.total = action.payload.total || 0;
      state.totalPages = action.payload.totalPages || 1;
    },

    // ✅ ADD SUBADMIN
    addSubAdmin: (state, action) => {
      alert("adding subadmin in slice");
      console.log("adding subadmin in slice", action.payload);
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
    setpage(state, action) {
      state.page = action.payload;
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
  setpage,
} = subAdminSlice.actions;

export default subAdminSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices(state, action) {
      state.services = action.payload.services;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
    },

    setServicePage(state, action) {
      state.page = action.payload;
    },

    setServiceLimit(state, action) {
      state.limit = action.payload;
    },

    nextServicePage(state) {
      if (state.page < state.totalPages) {
        state.page += 1;
      }
    },

    prevServicePage(state) {
      if (state.page > 1) {
        state.page -= 1;
      }
    },

    toggleServiceActive(state, action) {
      const service = state.services.find((s) => s.id === action.payload);
      if (service) {
        service.isactive = !service.isactive;
      }
    },
  },
});

export const {
  setServices,
  setServicePage,
  setServiceLimit,
  nextServicePage,
  prevServicePage,
  toggleServiceActive,
} = servicesSlice.actions;

export default servicesSlice.reducer;

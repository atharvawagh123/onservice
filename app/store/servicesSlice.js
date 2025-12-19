import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
  total: 0,
  page: 1,
  limit: 1,
  totalPages: 1,
  loading: false,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices(state, action) {
      state.services = action.payload.services;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
    },
    updateservice(state, action) {
      const updateservice = action.payload;
      state.services = state.services.map(ser => {
        if (ser.id.toString() === updateservice.id.toString()) {
          return { ...ser, isactive: !ser.isactive };
        }
        return ser;
      });
    },
    setServicePage(state, action) {
      state.page = action.payload;
    },
    setloading(state) {
      state.loading = !state.loading;
    },
    setServiceLimit(state, action) {
      state.limit = action.payload;
    },

    nextServicePage(state, action) {
      state.page = action.payload;
    },

    prevServicePage(state, action) {
      state.page = action.payload;
    },

    toggleServiceActive(state, action) {
      const service = state.services.find(s => s.id === action.payload);
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
  updateservice,
  setloading,
} = servicesSlice.actions;

export default servicesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [], // current page items
  page: 1, // current page
  limit: 5, // items per page
  totalCategories: 0, // total items in DB
  totalPages: 0, // total pages
  loading: false,
  error: null,
};

const CategoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    setCategories(state, action) {
      const { categories, page, limit, totalCategories, totalPages } =
        action.payload;
      state.categories = categories;
      state.page = page;
      state.limit = limit;
      state.totalCategories = totalCategories;
      state.totalPages = totalPages;
      // state.loading = !state.loading
    },
    addCategory(state, action) {
      state.categories.unshift(action.payload); // add new category to current page
      state.totalCategories += 1;
      state.totalPages = Math.ceil(state.totalCategories / state.limit);
    },
    removeCategory(state, action) {
      state.categories = state.categories.filter(
        cat => cat.id !== action.payload
      );
      state.totalCategories -= 1;
      state.totalPages = Math.ceil(state.totalCategories / state.limit);
    },
    updateCategory(state, action) {
      const index = state.categories.findIndex(
        cat => cat.id === action.payload.id
      );
      if (index !== -1) state.categories[index] = action.payload;
    },
    setlimitcategory(state, action) {
      state.limit = action.payload;
    },
    setpage(state, action) {
      state.page = action.payload;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCategories,
  addCategory,
  removeCategory,
  updateCategory,
  setLoading,
  setError,
  setlimitcategory,
  setpage,
} = CategoriesSlice.actions;
export default CategoriesSlice.reducer;

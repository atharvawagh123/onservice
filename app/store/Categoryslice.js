import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const CategoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    setcategory(state, action) {
      // Replace the entire categories array with new data
      state.categories = action.payload;
    },
    addCategory(state, action) {
      // Add new category at the beginning of the array
      state.categories.unshift(action.payload);
    },
    removeCategory(state, action) {
      // Optional: remove a category by id
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
    },
    updateCategory(state, action) {
      // Optional: update a category by id
      const index = state.categories.findIndex(
        (cat) => cat.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
  },
});

export const { setcategory, addCategory, removeCategory, updateCategory } =
  CategoriesSlice.actions;
export default CategoriesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeFilters: {
    date: "",
    status: "",
    priority: "",
  },
  insightFilters: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterByStatus: (state, action) => {
      state.homeFilters.status = action.payload.status;
    },
    filterByPriority: (state, action) => {
      state.homeFilters.priority = action.payload.priority;
    },
  },
});

export default filtersSlice.reducer;

export const { filterByStatus, filterByPriority } = filtersSlice.actions;

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
    filterByDate: (state, action) => {
      state.homeFilters.date = action.payload.date;
    },
    filterByStatus: (state, action) => {
      state.homeFilters.status = action.payload.status;
    },
    filterByPriority: (state, action) => {
      state.homeFilters.priority = action.payload.priority;
    },
  },
});

export default filtersSlice.reducer;

export const { filterByDate, filterByStatus, filterByPriority } =
  filtersSlice.actions;

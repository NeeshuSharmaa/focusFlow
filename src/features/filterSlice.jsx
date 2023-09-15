import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeFilters: {
    status: "",
    priority: "",
    search: "",
  },
  insightFilters: {
    status: "",
    priority: "",
    search: "",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterBySearch_H: (state, action) => {
      state.homeFilters.search = action.payload.search;
    },
    filterByStatus_H: (state, action) => {
      state.homeFilters.status = action.payload.status;
    },
    filterByPriority_H: (state, action) => {
      state.homeFilters.priority = action.payload.priority;
    },
    removeFilters_H: (state) => {
      state.homeFilters.status = "";
      state.homeFilters.priority = "";
      state.homeFilters.search = "";
    },
    filterByStatus_I: (state, action) => {
      console.log("status");
      state.insightFilters.status = action.payload.status;
    },
    filterByPriority_I: (state, action) => {
      state.insightFilters.priority = action.payload.priority;
    },
    filterBySearch_I: (state, action) => {
      state.insightFilters.search = action.payload.search;
    },
    removeFilters_I: (state) => {
      state.insightFilters.status = "";
      state.insightFilters.priority = "";
      state.insightFilters.search = "";
    },
  },
});

export default filtersSlice.reducer;

export const {
  filterBySearch_H,
  filterByStatus_H,
  filterByPriority_H,
  removeFilters_H,
  filterByPriority_I,
  filterByStatus_I,
  filterBySearch_I,
  removeFilters_I,
} = filtersSlice.actions;

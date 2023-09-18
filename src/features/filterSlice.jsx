import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeFilters: {
    status: JSON.parse(localStorage.getItem("homeFilters"))?.status || "",
    priority: JSON.parse(localStorage.getItem("homeFilters"))?.priority || "",
    search: JSON.parse(localStorage.getItem("homeFilters"))?.search || "",
  },
  insightFilters: {
    status: JSON.parse(localStorage.getItem("insightFilters"))?.status || "",
    priority:
      JSON.parse(localStorage.getItem("insightFilters"))?.priority || "",
    search: JSON.parse(localStorage.getItem("insightFilters"))?.search || "",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterBySearch_H: (state, action) => {
      state.homeFilters.search = action.payload.search;
      localStorage.setItem("homeFilters", JSON.stringify(state.homeFilters));
    },
    filterByStatus_H: (state, action) => {
      state.homeFilters.status = action.payload.status;
      localStorage.setItem("homeFilters", JSON.stringify(state.homeFilters));
    },
    filterByPriority_H: (state, action) => {
      state.homeFilters.priority = action.payload.priority;
      localStorage.setItem("homeFilters", JSON.stringify(state.homeFilters));
    },
    removeFilters_H: (state) => {
      state.homeFilters.status = "";
      state.homeFilters.priority = "";
      state.homeFilters.search = "";
      localStorage.setItem("homeFilters", JSON.stringify(state.homeFilters));
    },
    filterByStatus_I: (state, action) => {
      console.log("status");
      state.insightFilters.status = action.payload.status;
      localStorage.setItem(
        "insightFilters",
        JSON.stringify(state.insightFilters)
      );
    },
    filterByPriority_I: (state, action) => {
      state.insightFilters.priority = action.payload.priority;
      localStorage.setItem(
        "insightFilters",
        JSON.stringify(state.insightFilters)
      );
    },
    filterBySearch_I: (state, action) => {
      state.insightFilters.search = action.payload.search;
      localStorage.setItem(
        "insightFilters",
        JSON.stringify(state.insightFilters)
      );
    },
    removeFilters_I: (state) => {
      state.insightFilters.status = "";
      state.insightFilters.priority = "";
      state.insightFilters.search = "";
      localStorage.setItem(
        "insightFilters",
        JSON.stringify(state.insightFilters)
      );
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

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeFilters: {
    priority: JSON.parse(localStorage.getItem("homeFilters"))?.priority || {
      high: false,
      medium: false,
      low: false,
      none: false,
    },
    search: JSON.parse(localStorage.getItem("homeFilters"))?.search || "",
    sort: JSON.parse(localStorage.getItem("homeFilters"))?.sort || "",
  },
  insightFilters: {
    status: JSON.parse(localStorage.getItem("insightFilters"))?.status || "all",
    priority: JSON.parse(localStorage.getItem("insightFilters"))?.priority || {
      high: false,
      medium: false,
      low: false,
      none: false,
    },
    search: JSON.parse(localStorage.getItem("insightFilters"))?.search || "",

    sort: JSON.parse(localStorage.getItem("insightFilters"))?.sort || "",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterBySearch_H: (state, { payload }) => {
      state.homeFilters.search = payload.search;
      localStorage.setItem("homeFilters", JSON.stringify(state.homeFilters));
    },

    filterByPriority_H: (state, { payload }) => {
      const value = payload.value;
      const isChecked = payload.isChecked;
      state.homeFilters.priority = {
        ...state.homeFilters.priority,
        [value]: isChecked,
      };

      localStorage.setItem("homeFilters", JSON.stringify(state.homeFilters));
    },
    sort_H: (state, { payload }) => {
      state.homeFilters.sort = payload.sort;
      localStorage.setItem("homeFilters", JSON.stringify(state.homeFilters));
    },
    removeFilters_H: (state) => {
      state.homeFilters.priority = "";
      state.homeFilters.search = "";
      state.homeFilters.sort = "";
      localStorage.setItem("homeFilters", JSON.stringify(state.homeFilters));
    },
    filterByStatus_I: (state, { payload }) => {
      state.insightFilters.status = payload.status;
      localStorage.setItem(
        "insightFilters",
        JSON.stringify(state.insightFilters)
      );
    },
    filterByPriority_I: (state, { payload }) => {
      const value = payload.value;
      const isChecked = payload.isChecked;
      state.insightFilters.priority = {
        ...state.insightFilters.priority,
        [value]: isChecked,
      };

      localStorage.setItem(
        "insightFilters",
        JSON.stringify(state.insightFilters)
      );
    },
    filterBySearch_I: (state, { payload }) => {
      state.insightFilters.search = payload.search;
      localStorage.setItem(
        "insightFilters",
        JSON.stringify(state.insightFilters)
      );
    },
    sort_I: (state, { payload }) => {
      state.insightFilters.sort = payload.sort;
      localStorage.setItem(
        "insightFilters",
        JSON.stringify(state.insightFilters)
      );
    },
    removeFilters_I: (state) => {
      state.insightFilters.status = "";
      state.insightFilters.priority = "";
      state.insightFilters.search = "";
      state.insightFilters.sort = "";
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
  filterByPriority_H,
  sort_H,
  removeFilters_H,
  filterBySearch_I,
  filterByPriority_I,
  filterByStatus_I,
  sort_I,
  removeFilters_I,
} = filtersSlice.actions;

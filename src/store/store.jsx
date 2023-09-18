import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasksSlice";
import filtersReducer from "../features/filterSlice";
import settingsReducer from "../features/settingsSlice";

// all the reducers will be combined using configureStore
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
    settings: settingsReducer,
  },
});

export default store;

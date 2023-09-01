import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasksSlice";

// all the reducers will be combined using configureStore
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTasks: [],
};
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createdNewTask: (state, action) => {
      state.allTasks = [...state.allTasks, action.payload.task];
    },
  },
});

export default tasksSlice.reducer;

export const { createdNewTask } = tasksSlice.actions;

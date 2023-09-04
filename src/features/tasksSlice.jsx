import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTasks: [],
  isPomodoro: false,
};
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createdNewTask: (state, action) => {
      state.allTasks = [...state.allTasks, action.payload.task];
    },
    pomodoroMode: (state) => {
      state.isPomodoro = true;
    },
    stopwatchMode: (state) => {
      state.isPomodoro = false;
    },
  },
});

export default tasksSlice.reducer;

export const { createdNewTask, pomodoroMode, stopwatchMode } =
  tasksSlice.actions;

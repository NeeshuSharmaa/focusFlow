import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTasks: JSON.parse(localStorage.getItem("tasks")) || [],
  isPomodoro: false,
};
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createdNewTask: (state, action) => {
      state.allTasks = [...state.allTasks, action.payload.task];
      // localStorage.setItem(
      //   "tasks",
      //   JSON.stringify([...state.allTasks, action.payload.task])
      // );

      localStorage.setItem("tasks", JSON.stringify(state.allTasks));
    },
    pomodoroMode: (state) => {
      state.isPomodoro = true;
    },
    stopwatchMode: (state) => {
      state.isPomodoro = false;
    },
    taskCompleted: (state, action) => {
      const updatedTasks = state.allTasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );

      state.allTasks = updatedTasks;
      localStorage.setItem("tasks", JSON.stringify(state.allTasks));
    },
    durationSaved: (state, { payload }) => {
      const duration = state.isPomodoro
        ? 25 * 60 - payload.currentTime
        : payload.currentTime;
      const updatedTasks = state.allTasks.map((task) =>
        task.id === payload.id
          ? task.elapsedTime
            ? { ...task, elapsedTime: duration + task.elapsedTime }
            : { ...task, elapsedTime: duration }
          : task
      );

      state.allTasks = updatedTasks;
      localStorage.setItem("tasks", JSON.stringify(state.allTasks));
    },
  },
});

export default tasksSlice.reducer;

export const {
  createdNewTask,
  pomodoroMode,
  stopwatchMode,
  taskCompleted,
  durationSaved,
} = tasksSlice.actions;

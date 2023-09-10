import { createSlice } from "@reduxjs/toolkit";
import { getDate } from "./TimeUtils";

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
    durationSaved: (state, { payload: { id, currentTime, currentDate } }) => {
      const date = getDate(currentDate);
      const duration = state.isPomodoro ? 25 * 60 - currentTime : currentTime;

      const taskWithUpdatedTime = (task) => {
        if (task.timeSpent.find((curr) => curr.date === date)) {
          return {
            ...task,
            timeSpent: task.timeSpent.map((curr) =>
              curr.date === date
                ? { ...curr, elapsedTime: curr.elapsedTime + duration }
                : curr
            ),
          };
        } else {
          return {
            ...task,
            timeSpent: [...task.timeSpent, { date, elapsedTime: duration }],
          };
        }
      };

      const updatedTasks = state.allTasks.map((task) =>
        task.id === id ? taskWithUpdatedTime(task) : task
      );

      state.allTasks = updatedTasks;
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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

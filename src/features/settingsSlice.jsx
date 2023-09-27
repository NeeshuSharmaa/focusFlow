import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pomodoroLength:
    JSON.parse(localStorage.getItem("timerSettings"))?.pomodoroLength || 25,
  breakLength:
    JSON.parse(localStorage.getItem("timerSettings"))?.breakLength || 5,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPomodoroLength: (state, action) => {
      state.pomodoroLength = action.payload;
      localStorage.setItem("timerSettings", JSON.stringify(state));
    },
    setBreakLength: (state, action) => {
      state.breakLength = action.payload;
      localStorage.setItem("timerSettings", JSON.stringify(state));
    },
  },
});

export default settingsSlice.reducer;

export const { setPomodoroLength, setBreakLength } = settingsSlice.actions;

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTimeMMSS } from "../../features/TimeUtils";
import "react-circular-progressbar/dist/styles.css";
import useSound from "use-sound";

import Button from "./components/Button";
import { StopBreakModal, StopFocusModal } from "./components/StopModals";
import { BreakEndModal, PomoEndModal } from "./components/EndModals";
import timesUpTimer from "../../sound/timesUp.mp3";
import TaskInfo from "./components/TaskInfo";
import "./Timer.css";
import { durationSaved } from "../../features/tasksSlice";

export default function Pomodoro() {
  // param id
  const { id: ID } = useParams();

  // states & dispatch
  const tasks = useSelector((state) => state.tasks.allTasks);
  const focusLength = useSelector((state) => state.settings.pomodoroLength);
  const breakLength = useSelector((state) => state.settings.breakLength);
  const dispatch = useDispatch();

  // task to track
  const taskToTrack = tasks?.find(({ id }) => id == ID);

  // to track which timer is active
  const [activeTimer, setActiveTimer] = useState({
    focus: false,
    break: false,
  });

  // states for modals
  const [modal, setModal] = useState({
    focusStop: false,
    focusEnd: false,
    breakStop: false,
    breakEnd: false,
  });

  const [time, setTime] = useState(focusLength * 60);

  const [timeUpSound] = useSound(timesUpTimer, { volumne: 5 });

  useEffect(() => {
    // focus timer runs
    if (activeTimer.focus && time > 0) {
      const interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);

      // focus timer ends
    } else if (activeTimer && time === 0) {
      timeUpSound();
      dispatch(
        durationSaved({
          id: taskToTrack.id,
          currentTime: focusLength,
          currentDate: Date.now(),
        })
      );
      setModal((modals) => ({ ...modals, focusEnd: true }));

      // break timer runs
    } else if (activeTimer.break && time > 0) {
      const interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);

      // break timer ends
    } else if (activeTimer.break && time === 0) {
      timeUpSound();
      setModal((modals) => ({ ...modals, breakEnd: true }));
    }
  }, [time, activeTimer]);

  const percentage = (time) =>
    (time / ((activeTimer.focus ? focusLength : breakLength) * 60)) * 100;

  const PomodoroDisplay = () => {
    const barColor = activeTimer.focus
      ? "var(--primary-blue)"
      : "var(--secondary-black)";
    return (
      <div className="circular-bar">
        <CircularProgressbar
          value={percentage(time)}
          text={getTimeMMSS(time)}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            pathColor: barColor,
            textColor: barColor,
          })}
        />
      </div>
    );
  };

  return (
    <div className="timer-pomodoro">
      <TaskInfo task={taskToTrack} />
      <div className="timer">
        <PomodoroDisplay />
        <Button
          initialFocusTime={focusLength * 60}
          initialBreakTime={breakLength * 60}
          activeTimer={activeTimer}
          time={time}
          setTime={setTime}
          setActiveTimer={setActiveTimer}
          setModal={setModal}
        />
      </div>

      {modal.focusStop && (
        <StopFocusModal
          time={time}
          initialFocusTime={focusLength * 60}
          initialBreakTime={breakLength * 60}
          taskId={taskToTrack.id}
          setModal={setModal}
          setActiveTimer={setActiveTimer}
          setTime={setTime}
        />
      )}
      {modal.focusEnd && (
        <PomoEndModal
          setActiveTimer={setActiveTimer}
          setModal={setModal}
          setTime={setTime}
          initialFocusTime={focusLength * 60}
          breakLength={breakLength}
        />
      )}
      {modal.breakEnd && (
        <BreakEndModal
          setActiveTimer={setActiveTimer}
          setModal={setModal}
          setTime={setTime}
          initialFocusTime={focusLength * 60}
          initialBreakTime={breakLength * 60}
        />
      )}

      {modal.breakStop && (
        <StopBreakModal
          setActiveTimer={setActiveTimer}
          setModal={setModal}
          setTime={setTime}
          initialFocusTime={focusLength * 60}
        />
      )}
    </div>
  );
}

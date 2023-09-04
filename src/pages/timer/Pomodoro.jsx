import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Timer.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "./Button";
import StopTimerModal from "./stopTimerModal";

export default function Pomodoro() {
  const { id: ID } = useParams();
  const tasks = useSelector((state) => state.tasks.allTasks);

  const taskToTrack = tasks?.find(({ id }) => id == ID);

  const [time, setTime] = useState(25 * 60);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [stopActive, setStopActive] = useState(false);

  const PomodoroDisplay = () => {
    return (
      <div className="circular-bar">
        <CircularProgressbar
          value={percentage(time)}
          text={getTime(time)}
          styles={buildStyles({
            pathTransitionDuration: 0.5,
            pathColor: "var(--primary-blue)",
            textColor: "var(--secondary-black)",
          })}
        />
      </div>
    );
  };

  useEffect(() => {
    if (timerIsActive && time > 0) {
      const interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, timerIsActive]);

  const getTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const percentage = (time) => (time / (25 * 60)) * 100;

  return (
    <div className="timer-pomodoro">
      <span>{taskToTrack?.name}</span>
      <PomodoroDisplay />

      <Button
        time={time}
        setTime={setTime}
        initialTime={25 * 60}
        timerIsActive={timerIsActive}
        setTimerIsActive={setTimerIsActive}
        setStopActive={setStopActive}
      />
      {stopActive && (
        <StopTimerModal
          setStopActive={setStopActive}
          setTimerIsActive={setTimerIsActive}
          setTime={setTime}
          initialTime={25 * 60}
        />
      )}
    </div>
  );
}

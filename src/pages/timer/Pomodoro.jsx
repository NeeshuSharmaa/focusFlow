import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Timer.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "./Button";
import StopTimerModal from "./stopTimerModal";
import { getTimeMMSS } from "../../features/TimeUtils";
import PomoBreakModal from "./PomoBreakModal";
import useSound from "use-sound";
import timesUpTimer from "../../sound/timesUp.mp3";

export default function Pomodoro() {
  const { id: ID } = useParams();
  const tasks = useSelector((state) => state.tasks.allTasks);
  const pomodoroLength = useSelector((state) => state.settings.pomodoroLength);

  const taskToTrack = tasks?.find(({ id }) => id == ID);

  const [time, setTime] = useState(pomodoroLength * 60);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [stopActive, setStopActive] = useState(false);
  const [breakModal, setBreakModal] = useState(false);

  const [timeUpSound] = useSound(timesUpTimer, { volumne: 5 });

  const PomodoroDisplay = () => {
    return (
      <div className="circular-bar">
        <CircularProgressbar
          value={percentage(time)}
          text={getTimeMMSS(time)}
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
    if (timerIsActive && time === 0) {
      timeUpSound();
      setBreakModal(true);
    }
  }, [time, timerIsActive]);

  const percentage = (time) => (time / (pomodoroLength * 60)) * 100;

  return (
    <div className="timer-pomodoro">
      <span>{taskToTrack?.name}</span>
      <PomodoroDisplay />

      <Button
        time={time}
        setTime={setTime}
        initialTime={pomodoroLength * 60}
        timerIsActive={timerIsActive}
        setTimerIsActive={setTimerIsActive}
        setStopActive={setStopActive}
      />
      {stopActive && (
        <StopTimerModal
          time={time}
          initialTime={pomodoroLength * 60}
          taskId={taskToTrack.id}
          setStopActive={setStopActive}
          setTimerIsActive={setTimerIsActive}
          setTime={setTime}
        />
      )}
      {breakModal && (
        <PomoBreakModal
          setBreakModal={setBreakModal}
          setTime={setTime}
          initialTime={pomodoroLength * 60}
        />
      )}
    </div>
  );
}

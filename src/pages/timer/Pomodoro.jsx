import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTimeMMSS } from "../../features/TimeUtils";
import "react-circular-progressbar/dist/styles.css";
import useSound from "use-sound";

import Button from "./components/Button";
import StopTimerModal from "./components/StopTimerModal";
import PomoBreakModal from "./components/PomoBreakModal";
import timesUpTimer from "../../sound/timesUp.mp3";
import TaskInfo from "./components/TaskInfo";
import "./Timer.css";

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
            textColor: "var(--primary-black)",
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
      <TaskInfo task={taskToTrack} />
      <div className="timer">
        <PomodoroDisplay />
        <Button
          time={time}
          setTime={setTime}
          initialTime={pomodoroLength * 60}
          timerIsActive={timerIsActive}
          setTimerIsActive={setTimerIsActive}
          setStopActive={setStopActive}
        />
      </div>

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

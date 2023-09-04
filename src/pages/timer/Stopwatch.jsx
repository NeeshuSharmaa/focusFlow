import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCirclePause,
  faCirclePlay,
} from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Button from "./Button";
import StopTimerModal from "./stopTimerModal";

export default function Stopwatch() {
  const { id: ID } = useParams();
  const tasks = useSelector((state) => state.tasks.allTasks);

  const taskToTrack = tasks?.find(({ id }) => id == ID);

  const [time, setTime] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [stopActive, setStopActive] = useState(false);

  const getTime = () => {
    const hr = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hr < 10 ? "0" + hr : hr} : ${mins < 10 ? "0" + mins : mins} : ${
      secs < 10 ? "0" + secs : secs
    }`;
  };

  useEffect(() => {
    if (timerIsActive) {
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, timerIsActive]);
  return (
    <div className="stopwatch">
      <span>
        <FontAwesomeIcon icon={faCircle} />
        {taskToTrack?.name}
      </span>

      <h1 className="time">{getTime(time)}</h1>
      <Button
        timerIsActive={timerIsActive}
        setTimerIsActive={setTimerIsActive}
        time={time}
        setTime={setTime}
        initialTime={0}
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

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Button from "./Button";
import StopTimerModal from "./stopTimerModal";
import { getTimeHHMMSS } from "../../features/TimeUtils";
import TaskInfo from "./TaskInfo";

export default function Stopwatch() {
  const { id: ID } = useParams();
  const tasks = useSelector((state) => state.tasks.allTasks);

  const taskToTrack = tasks?.find(({ id }) => id == ID);

  const [time, setTime] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [stopActive, setStopActive] = useState(false);

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
      <TaskInfo task={taskToTrack} />
      <div className="timer">
        <h1 className="time">{getTimeHHMMSS(time)}</h1>
        <Button
          timerIsActive={timerIsActive}
          setTimerIsActive={setTimerIsActive}
          time={time}
          setTime={setTime}
          initialTime={0}
          setStopActive={setStopActive}
        />
      </div>

      {stopActive && (
        <StopTimerModal
          time={time}
          initialTime={0}
          taskId={taskToTrack.id}
          setStopActive={setStopActive}
          setTimerIsActive={setTimerIsActive}
          setTime={setTime}
        />
      )}
    </div>
  );
}

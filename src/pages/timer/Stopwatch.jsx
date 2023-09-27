import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTimeHHMMSS } from "../../features/TimeUtils";

import Button from "./components/Button";
import { StopFocusModal } from "./components/StopModals";
import TaskInfo from "./components/TaskInfo";
import "./Timer.css";

export default function Stopwatch() {
  const { id: ID } = useParams();
  const tasks = useSelector((state) => state.tasks.allTasks);

  const taskToTrack = tasks?.find(({ id }) => id == ID);

  const [time, setTime] = useState(0);
  const [activeTimer, setActiveTimer] = useState(false);

  useEffect(() => {
    if (activeTimer) {
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, activeTimer]);
  return (
    <div className="stopwatch">
      <TaskInfo task={taskToTrack} />
      <div className="timer">
        <h1 className="time">{getTimeHHMMSS(time)}</h1>
        <Button
          activeTimer={activeTimer}
          setActiveTimer={setActiveTimer}
          time={time}
          setTime={setTime}
          initialStopwatchTime={0}
        />
      </div>
    </div>
  );
}

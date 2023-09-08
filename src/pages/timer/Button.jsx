import {
  faCirclePlay,
  faCircleStop,
} from "@fortawesome/free-regular-svg-icons";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector } from "react-redux";

export default function Button({
  timerIsActive,
  setTimerIsActive,
  time,
  setTime,
  initialTime,
  setStopActive,
}) {
  const isPomodoro = useSelector((state) => state.tasks.isPomodoro);
  const stopTimer = () => {
    setStopActive(true);
    setTimerIsActive(false);
  };

  return (
    <>
      {!timerIsActive && time === initialTime && (
        <button
          className="primary-btn"
          onClick={() => setTimerIsActive((active) => !active)}
        >
          <FontAwesomeIcon icon={faCirclePlay} className="fa-icon" />
          <span>Start to focus</span>
        </button>
      )}
      {timerIsActive && (
        <div className="flex-row-2">
          <button
            className="primary-btn"
            onClick={() => setTimerIsActive((active) => !active)}
          >
            <FontAwesomeIcon icon={faCirclePause} className="fa-icon" />
            <span>{isPomodoro ? "Take a break" : "Pause"}</span>
          </button>
          <button className="secondary-btn" onClick={stopTimer}>
            <FontAwesomeIcon icon={faCircleStop} className="fa-icon" />
            <span>Stop</span>
          </button>
        </div>
      )}

      {!timerIsActive && time !== initialTime && (
        <div className="flex-row-2">
          <button
            className="primary-btn"
            onClick={() => setTimerIsActive((active) => !active)}
          >
            {" "}
            <FontAwesomeIcon icon={faCirclePlay} className="fa-icon" />
            <span>Continue</span>
          </button>
          <button className="secondary-btn" onClick={stopTimer}>
            <FontAwesomeIcon icon={faCircleStop} className="fa-icon" />
            <span>Stop</span>
          </button>
        </div>
      )}
    </>
  );
}

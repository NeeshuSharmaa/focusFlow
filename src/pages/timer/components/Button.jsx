import {
  faCirclePlay,
  faCircleStop,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCirclePause,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector } from "react-redux";
import useSound from "use-sound";
import startTimer from "../../../sound/startTimer.mp3";
import pauseTimer from "../../../sound/pauseTimer.mp3";

export default function Button({
  focusBar,
  activeTimer,
  initialFocusTime,

  initialStopwatchTime,
  time,
  setTime,
  setActiveTimer,
  setModal,
}) {
  const [startSound] = useSound(startTimer, { volume: 5 });
  const [pauseSound] = useSound(pauseTimer, { volume: 5 });

  const isPomodoro = useSelector((state) => state.tasks.isPomodoro);

  const handleStop = () => {
    if (activeTimer.focus && !activeTimer.break) {
      setModal((modals) => ({ ...modals, focusStop: true }));
      setActiveTimer((timer) => ({ ...timer, focus: false }));
    } else if (activeTimer.break && !activeTimer.focus) {
      setModal((modals) => ({ ...modals, breakStop: true }));
      setActiveTimer((timer) => ({ ...timer, break: false }));
    }
  };
  const handlePause = () => {
    setActiveTimer(false);
  };
  const handleContinue = () => {
    setActiveTimer(true);
  };
  const handleReset = () => {
    setActiveTimer(false);
    setTime(initialStopwatchTime);
    pauseSound();
  };

  return (
    <>
      {((isPomodoro && !activeTimer.focus && time === initialFocusTime) ||
        (!isPomodoro && !activeTimer && time === initialStopwatchTime)) && (
        <button
          className="primary-btn"
          onClick={() => {
            setActiveTimer((timer) => ({ ...timer, focus: true }));
            startSound();
          }}
        >
          <FontAwesomeIcon icon={faCirclePlay} className="fa-icon" />
          <span>Start to focus</span>
        </button>
      )}

      {isPomodoro && (activeTimer.focus || activeTimer.break) && (
        <button
          className={focusBar ? "primary-btn" : "primary-btn gray-bg"}
          onClick={handleStop}
        >
          <FontAwesomeIcon icon={faCircleStop} className="fa-icon" />
          <span>Stop</span>
        </button>
      )}
      {!isPomodoro && time !== initialStopwatchTime && (
        <div className="flex-row-2">
          <button
            className="primary-btn"
            onClick={activeTimer ? handlePause : handleContinue}
          >
            <FontAwesomeIcon
              icon={activeTimer ? faCircleStop : faCirclePlay}
              className="fa-icon"
            />
            <span>{activeTimer ? "Pause" : "Continue"}</span>
          </button>

          <button className="primary-btn" onClick={handleReset}>
            <FontAwesomeIcon icon={faClockRotateLeft} className="fa-icon" />
            <span>Reset</span>
          </button>
        </div>
      )}
    </>
  );
}

import {
  faClockRotateLeft,
  faHourglassStart,
  faMugHot,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { durationSaved, taskCompleted } from "../../../features/tasksSlice";
import useSound from "use-sound";
import pauseTimer from "../../../sound/pauseTimer.mp3";

export function StopFocusModal({
  taskId,
  initialFocusTime,
  initialBreakTime,

  time,
  setTime,
  setActiveTimer,
  setModal,
  setFocusBar,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pauseSound] = useSound(pauseTimer, { volume: 5 });

  const handleOutsideClick = () => {
    setActiveTimer((timer) => ({ ...timer, focus: true }));
    setModal((modals) => ({ ...modals, focusStop: false }));
  };
  const noFocusingNow = () => {
    pauseSound();
    dispatch(
      durationSaved({
        id: taskId,
        currentTime: time,
        currentDate: Date.now(),
      })
    );

    setModal((modals) => ({ ...modals, focus: false }));
    setTime(initialFocusTime);

    navigate("/");
  };
  const handleStartBreak = () => {
    setModal((modals) => ({ ...modals, focusStop: false }));
    setActiveTimer((timer) => ({ ...timer, break: true }));
    setTime(initialBreakTime);
    setFocusBar(false);
  };
  return (
    <div className="modal">
      <div className="outside-click" onClick={handleOutsideClick}></div>
      <div className="modal-main stop-active-modal">
        <div>
          <span>Is your task completed?</span>
          <small>(your task duration will be saved)</small>
        </div>
        <div className="actions">
          <div
            onClick={() => {
              noFocusingNow();

              dispatch(taskCompleted({ id: taskId }));
            }}
          >
            <FontAwesomeIcon icon={faCircleCheck} />
            <span>Yes, I'm done</span>
          </div>
          <div onClick={noFocusingNow}>
            <FontAwesomeIcon icon={faClockRotateLeft} />
            <span>No, I'll continue later</span>
          </div>
          <div onClick={handleStartBreak}>
            <FontAwesomeIcon icon={faMugHot} />
            <span>No, I'll take the break</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StopBreakModal({
  setActiveTimer,
  setModal,
  setTime,
  initialFocusTime,
  setFocusBar,
}) {
  const handleOutsideClick = () => {
    setActiveTimer((timer) => ({ ...timer, break: true }));
    setModal((modals) => ({ ...modals, breakStop: false }));
  };

  const handleStartPomodoro = () => {
    setActiveTimer((timer) => ({ ...timer, focus: true }));
    setTime(initialFocusTime);
    setModal((modals) => ({ ...modals, breakStop: false }));
    setFocusBar(true);
  };
  const handleContinue = () => {
    setActiveTimer((timer) => ({ ...timer, break: true }));
    setModal((modals) => ({ ...modals, breakStop: false }));
  };
  return (
    <div className="modal">
      <div className="outside-click" onClick={handleOutsideClick}></div>
      <div className="modal-main stop-active-modal">
        <div>
          <span>Stop the Break!</span>
          <small>Do you want to stop the break?</small>
        </div>
        <div className="actions">
          <div onClick={handleStartPomodoro}>
            <FontAwesomeIcon icon={faHourglassStart} />
            <span>Yes! start the pomodoro</span>
          </div>
          <div onClick={handleContinue}>
            <FontAwesomeIcon icon={faCirclePlay} />
            <span>No! continue break</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  faClockRotateLeft,
  faHourglassStart,
  faMugHot,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router";
import useSound from "use-sound";

import startTimer from "../../../sound/startTimer.mp3";

import timesUp from "../../../sound/timesUp.mp3";
import { toast } from "react-toastify";

export function PomoEndModal({
  setActiveTimer,
  setModal,

  setTime,
  initialFocusTime,

  breakLength,
  setFocusBar,
}) {
  const initialBreakTime = breakLength * 60;
  const [startSound] = useSound(startTimer, { volume: 5 });

  const handleStartBreak = () => {
    setModal((modals) => ({ ...modals, focusEnd: false }));
    setActiveTimer((timer) => ({ ...timer, break: true }));
    setTime(initialBreakTime);
    setFocusBar(false);
  };
  const handleStartPomo = () => {
    setModal((modals) => ({ ...modals, focusEnd: false }));
    setActiveTimer((timer) => ({ ...timer, focus: true }));
    setTime(initialFocusTime);
    setFocusBar(true);

    startSound();
  };
  return (
    <div className="modal">
      <div className="modal-main stop-active-modal">
        <div>
          Do you want to take{" "}
          {breakLength === 1 ? `${breakLength} min ` : `${breakLength} mins `}
          break?
        </div>
        <div className="actions">
          <div onClick={handleStartBreak}>
            <FontAwesomeIcon icon={faMugHot} />
            <span>Yes</span>
          </div>
          <div onClick={handleStartPomo}>
            <FontAwesomeIcon icon={faHourglassStart} />
            <span>No! Continue focusing</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BreakEndModal({
  setActiveTimer,
  setModal,
  setTime,
  initialFocusTime,
  initialBreakTime,
  setFocusBar,
}) {
  const navigate = useNavigate();
  const [startSound] = useSound(startTimer, { volume: 5 });
  const handleStartBreak = () => {
    setModal((modals) => ({ ...modals, breakEnd: false }));
    setActiveTimer((timer) => ({ ...timer, break: true }));
    setTime(initialBreakTime);
    setFocusBar(false);
    toast.success(`${initialBreakTime / 60} mins break has started`, {
      className: "toast",
    });
  };
  const handleStartPomo = () => {
    setModal((modals) => ({ ...modals, breakEnd: false }));
    setActiveTimer((timer) => ({ ...timer, focus: true }));
    setTime(initialFocusTime);
    setFocusBar(true);
    startSound();
    toast.success(`${initialFocusTime / 60} mins focus timer has started`, {
      className: "toast",
    });
  };

  const handleExit = () => {
    setModal((modals) => ({ ...modals, breakEnd: false }));
    setActiveTimer((timer) => ({ ...timer, break: false }));
    navigate("/");
  };
  return (
    <div className="modal">
      <div className="modal-main stop-active-modal">
        <div>
          <span>The Break is Over!</span>
          <small>Ready to start focusing?</small>
        </div>
        <div className="actions">
          <div onClick={handleStartBreak}>
            <FontAwesomeIcon icon={faClockRotateLeft} />
            <span>No, continue the break</span>
          </div>

          <div onClick={handleStartPomo}>
            <FontAwesomeIcon icon={faHourglassStart} />
            <span>Yes, start the pomodoro</span>
          </div>
          <div onClick={handleExit}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>No, exit to home</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import "./Task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pomodoroMode, stopwatchMode } from "../../features/tasksSlice";

export default function Task({ id, name, dueDate }) {
  const [timerModeModal, setTimerModeModal] = useState(false);
  const dispatch = useDispatch();

  console.log(timerModeModal);

  const ChoseTimerMode = () => {
    return (
      <div className="timers-modal-outer">
        <div
          className="outside-click"
          onClick={(e) => {
            e.stopPropagation();
            setTimerModeModal(false);
          }}
        ></div>
        <div className="timers-modal">
          <Link to={`/timer/${id}`} onClick={() => dispatch(pomodoroMode())}>
            <span>
              25:00{" "}
              <FontAwesomeIcon icon={faArrowRightLong} width="15" height="15" />{" "}
              00:00
            </span>
            <small>Countdown from 25:00 until the end of the time</small>
          </Link>
          <Link to={`/timer/${id}`} onClick={() => dispatch(stopwatchMode())}>
            <span>
              00:00 <FontAwesomeIcon icon={faArrowRightLong} />{" "}
              <FontAwesomeIcon icon={faInfinity} />
            </span>
            <small>Start counting from 00:00 until stop manually</small>
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div className="task" onClick={() => setTimerModeModal(true)}>
      {timerModeModal && <ChoseTimerMode />}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="var(--primary-blue)"
          className="w-6 h-6"
          height="22"
          width="22"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
            clipRule="evenodd"
          />
        </svg>
        <span>{name}</span>
      </div>
      <span>{dueDate}</span>
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { pomodoroMode, stopwatchMode } from "../../../../features/tasksSlice";

export default function ChooseTimerModal({ dispatch, id, setTimerModeModal }) {
  return (
    <div className="modal">
      <div
        className="outside-click"
        onClick={(e) => {
          e.stopPropagation();
          setTimerModeModal(false);
        }}
      ></div>
      <div className="modal-main">
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
}

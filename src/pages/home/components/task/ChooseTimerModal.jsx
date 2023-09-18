import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { pomodoroMode, stopwatchMode } from "../../../../features/tasksSlice";
import { useSelector } from "react-redux";

export default function ChooseTimerModal({ dispatch, id, setTimerModeModal }) {
  const pomodoroLength = useSelector((state) => state.settings.pomodoroLength);
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
            {pomodoroLength}:00{" "}
            <FontAwesomeIcon icon={faArrowRightLong} width="15" height="15" />{" "}
            00:00
          </span>
          <small>
            Countdown from {pomodoroLength}:00 minutes until the end of the time
          </small>
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

import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCirclePlay,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

export default function StopTimerModal({
  setStopActive,
  setTimerIsActive,
  setTime,
  initialTime,
}) {
  const navigate = useNavigate();
  return (
    <div className="modal">
      <div className="modal-main stop-active-modal">
        <div>
          <span>Is your task completed?</span>
          <small>(your task duration will be saved)</small>
        </div>
        <div className="actions">
          <div
            onClick={() => {
              console.log("elapsed time saved");
              console.log("task marked as COMPLETED");
              setStopActive(false);
              setTime(initialTime);
              navigate("/");
            }}
          >
            <FontAwesomeIcon icon={faCircleCheck} />
            <span>Yes, I'm done</span>
          </div>
          <div
            onClick={() => {
              setStopActive(false);
              setTimerIsActive(true);
            }}
          >
            <FontAwesomeIcon icon={faCirclePlay} />
            <span>No, I'll continue focusing</span>
          </div>
          <div
            onClick={() => {
              console.log("elapsed time saved");
              setStopActive(false);
              setTime(initialTime);
              navigate("/");
            }}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} />
            <span>No, I'll continue later</span>
          </div>
        </div>
      </div>
    </div>
  );
}

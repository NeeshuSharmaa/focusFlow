import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCirclePlay,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { durationSaved, taskCompleted } from "../../features/tasksSlice";

export default function StopTimerModal({
  time,
  initialTime,
  taskId,
  setStopActive,
  setTimerIsActive,
  setTime,
}) {
  const dispatch = useDispatch();
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
              dispatch(
                durationSaved({
                  id: taskId,
                  currentTime: time,
                  currentDate: Date.now(),
                })
              );
              dispatch(taskCompleted({ id: taskId }));

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
              dispatch(
                durationSaved({
                  id: taskId,
                  currentTime: time,
                  currentDate: Date.now(),
                })
              );
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

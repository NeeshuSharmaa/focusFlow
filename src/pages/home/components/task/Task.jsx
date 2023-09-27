import { useState } from "react";
import "./Task.css";

import { useDispatch } from "react-redux";

import ChooseTimerModal from "./ChooseTimerModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCirclePlay,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { taskCompleted } from "../../../../features/tasksSlice";
import { toast } from "react-toastify";

export default function Task({ id, name, dueDate, completed, priority }) {
  const [timerModeModal, setTimerModeModal] = useState(false);
  const dispatch = useDispatch();

  const priorityColor = () => {
    if (completed) {
      return "gray";
    } else {
      if (priority === "high") {
        return "high-priority";
      } else if (priority === "medium") {
        return "medium-priority";
      } else if (priority === "low") {
        return "low-priority";
      } else {
        return "no-priority";
      }
    }
  };

  return (
    <div className="task">
      {timerModeModal && (
        <ChooseTimerModal
          dispatch={dispatch}
          id={id}
          setTimerModeModal={setTimerModeModal}
        />
      )}
      <div>
        <FontAwesomeIcon
          icon={completed ? faCircleCheck : faCircle}
          className={completed ? "gray" : "blue"}
          onClick={() => {
            dispatch(taskCompleted({ id }));
            toast.success(
              `${name} is marked as ${completed ? "pending" : "completed"}!`,
              {
                className: "toast",
              }
            );
          }}
        />
        {!completed && (
          <FontAwesomeIcon
            icon={faCirclePlay}
            className="blue"
            onClick={() => setTimerModeModal(true)}
          />
        )}
        <span className={completed ? "gray" : "black"}>{name}</span>
      </div>
      <div>
        <span className={completed ? "gray" : "black"}>{dueDate}</span>

        <FontAwesomeIcon icon={faFlag} className={priorityColor()} />
      </div>
    </div>
  );
}

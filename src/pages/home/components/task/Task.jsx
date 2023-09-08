import { useState } from "react";
import "./Task.css";

import { useDispatch } from "react-redux";

import ChooseTimerModal from "./ChooseTimerModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { taskCompleted } from "../../../../features/tasksSlice";

export default function Task({ id, name, dueDate, completed }) {
  const [timerModeModal, setTimerModeModal] = useState(false);
  const dispatch = useDispatch();

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
          onClick={() => dispatch(taskCompleted({ id }))}
        />
        {!completed && (
          <FontAwesomeIcon
            icon={faCirclePlay}
            className="blue"
            onClick={() => setTimerModeModal(true)}
          />
        )}
        <span>{name}</span>
      </div>
      <span>{dueDate}</span>
    </div>
  );
}

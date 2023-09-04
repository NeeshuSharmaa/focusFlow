import { useState } from "react";
import "./Task.css";

import { useDispatch } from "react-redux";

import ChooseTimerModal from "./ChooseTimerModal";

export default function Task({ id, name, dueDate }) {
  const [timerModeModal, setTimerModeModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="task" onClick={() => setTimerModeModal(true)}>
      {timerModeModal && (
        <ChooseTimerModal
          dispatch={dispatch}
          id={id}
          setTimerModeModal={setTimerModeModal}
        />
      )}
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

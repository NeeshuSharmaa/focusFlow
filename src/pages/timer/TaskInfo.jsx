import {
  faCaretDown,
  faCaretUp,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function TaskInfo({
  task: { name, dueDate, priority, description },
}) {
  const [showDescription, setShowDescription] = useState(false);

  const priorityColor = () => {
    if (priority === "high") {
      return "high-priority";
    } else if (priority === "medium") {
      return "medium-priority";
    } else if (priority === "low") {
      return "low-priority";
    } else {
      return "no-priority";
    }
  };
  return (
    <div className="task-info">
      <div className="header">
        <h2>{name}</h2>
        <FontAwesomeIcon
          className="dropdown-icon"
          icon={showDescription ? faCaretUp : faCaretDown}
          onClick={() => setShowDescription((show) => !show)}
        />
      </div>

      <div className="sub-info">
        <small>{dueDate}</small>
        <div className="flex-row-jb">
          <FontAwesomeIcon icon={faFlag} className={priorityColor()} />
          <small>
            {priority === "none" ? "no " : `${priority} `}
            priority
          </small>
        </div>
      </div>
      {showDescription && <p>{description}</p>}
    </div>
  );
}

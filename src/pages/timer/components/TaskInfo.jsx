import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TaskInfo({ task: { name, dueDate, priority } }) {
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
      <h2>{name}</h2>

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
    </div>
  );
}

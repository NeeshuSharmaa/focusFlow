import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Task from "./task/Task";

export const CompletedTasks = ({
  showCompletedTasks,
  setShowCompletedTasks,
  completedTasks,
}) => {
  return (
    <>
      <span
        className="completed-tasks"
        onClick={() => setShowCompletedTasks((show) => !show)}
      >
        <small>{showCompletedTasks ? "Hide" : "Show"} completed tasks </small>
        <FontAwesomeIcon icon={showCompletedTasks ? faCaretUp : faCaretDown} />
      </span>
      {showCompletedTasks &&
        completedTasks?.map((task) => <Task key={task.id} {...task} />)}
    </>
  );
};

export const NoTasks = ({ noTasksInfo }) => {
  return (
    <div className="no-tasks">
      <img src="no-tasks.png" alt="no-tasks-illustration" />
      <div>
        <span>No tasks</span>
        <small>{noTasksInfo}</small>
      </div>
    </div>
  );
};

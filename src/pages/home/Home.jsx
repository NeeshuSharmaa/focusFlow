import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SummaryOnHome from "./components/SummaryOnHome";
import Task from "./components/task/Task";
import TaskModal from "./components/taskModal/TaskModal";

import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { filterByPriority, filterByStatus } from "../../features/filterSlice";
import { filteredTasks } from "../../features/FilterLogic";

export default function Home() {
  const [showTaskModal, setShowTaskModal] = useState(false);

  const tasks = useSelector((state) => state.tasks.allTasks);
  const filters = useSelector((state) => state.filters.homeFilters);

  const dispatch = useDispatch();

  const tasksToDisplay = filteredTasks(tasks, filters);

  return (
    <div className="home">
      <SummaryOnHome tasks={tasksToDisplay} />
      <div className="flex-row-jb">
        <div className="filters-home">
          <select
            onChange={(e) =>
              dispatch(filterByStatus({ status: e.target.value }))
            }
          >
            <option defaultValue disabled>
              Priority
            </option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="both">Both</option>
          </select>
          <select
            onChange={(e) =>
              dispatch(filterByPriority({ priority: e.target.value }))
            }
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low"> Low</option>
            <option value="none">None</option>
          </select>
        </div>
        <button className="primary-btn" onClick={() => setShowTaskModal(true)}>
          <FontAwesomeIcon icon={faCirclePlus} className="fa-icon" />
          <span>Create New Task</span>
        </button>
      </div>

      {!!tasks.length && (
        <section className="tasks-list">
          {tasksToDisplay?.map((task) => (
            <Task key={task.id} {...task} />
          ))}{" "}
        </section>
      )}
      {tasks.length === 0 && (
        <div className="no-tasks">
          <img src="no-tasks.png" alt="no-tasks-illustration" />
          <div>
            <span>No tasks</span>
            <small>{`Click the "Create New Task" button to add`}</small>
          </div>
        </div>
      )}
      <TaskModal
        setShowTaskModal={setShowTaskModal}
        showTaskModal={showTaskModal}
      />
    </div>
  );
}

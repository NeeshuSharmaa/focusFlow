import { useState } from "react";
import { useSelector } from "react-redux";

import SummaryOnHome from "./components/SummaryOnHome";
import Task from "./components/task/Task";
import TaskModal from "./components/taskModal/TaskModal";

import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [showTaskModal, setShowTaskModal] = useState(false);

  const tasks = useSelector((state) => state.tasks.allTasks);

  return (
    <div className="home">
      <SummaryOnHome tasks={tasks} />
      <div className="flex-row-jb">
        <div className="filters-home">
          <select>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="both">Both</option>
            <span className="select-placeholder">By Priority</span>
          </select>
          <select>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low"> Low</option>
            <option value="none">None</option>
            <span className="select-placeholder">By Priority</span>
          </select>
        </div>
        <button className="primary-btn" onClick={() => setShowTaskModal(true)}>
          <FontAwesomeIcon icon={faCirclePlus} className="fa-icon" />
          <span>Create New Task</span>
        </button>
      </div>

      {!!tasks.length && (
        <section className="tasks-list">
          {tasks.map((task) => (
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

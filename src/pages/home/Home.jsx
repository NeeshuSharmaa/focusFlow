import { useState } from "react";
import { useSelector } from "react-redux";

import SummaryOnHome from "./components/SummaryOnHome";
import Task from "./components/task/Task";
import TaskModal from "./components/taskModal/TaskModal";

import "./Home.css";

export default function Home() {
  const [showTaskModal, setShowTaskModal] = useState(false);

  const tasks = useSelector((state) => state.tasks.allTasks);

  return (
    <div className="home">
      <SummaryOnHome tasks={tasks} />
      <button className="primary-btn" onClick={() => setShowTaskModal(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          height="25"
          width="25"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            clipRule="evenodd"
          />
        </svg>

        <span>Create New Task</span>
      </button>

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

import { useState } from "react";
import "./Home.css";

import TaskModal from "../../components/taskModal/TaskModal";
import { useSelector } from "react-redux";

export default function Home() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const tasks = useSelector((state) => state.tasks.allTasks);
  console.log(tasks);
  return (
    <div className="home">
      <section className="summary">
        <div className="summary-child">
          <div className="summary-child-main">
            <h1>0</h1>
            <small>m</small>
          </div>
          <small>Estimated Time</small>
        </div>
        <div className="summary-child">
          <h1>0</h1>

          <small>Tasks to be Completed</small>
        </div>
        <div className="summary-child">
          <div className="summary-child-main">
            <h1>0</h1>
            <small>m</small>
          </div>
          <small>Elapsed Time</small>
        </div>
        <div className="summary-child">
          <h1>0</h1>
          <small>Completed Tasks</small>
        </div>
      </section>
      <button onClick={() => setShowTaskModal(true)}>
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
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
            clipRule="evenodd"
          />
        </svg>
        <span>Track New Task</span>
      </button>
      <section className="tasks-list">
        {tasks.map((task) => (
          <span key={task.id}>{task.name}</span>
        ))}
      </section>
      <TaskModal
        setShowTaskModal={setShowTaskModal}
        showTaskModal={showTaskModal}
      />
    </div>
  );
}

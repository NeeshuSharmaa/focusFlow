import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SummaryOnHome from "./components/SummaryOnHome";
import Task from "./components/task/Task";
import TaskModal from "./components/taskModal/TaskModal";

import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  filterByPriority_H,
  filterBySearch_H,
  removeFilters_H,
  sort_H,
} from "../../features/filterSlice";
import { filteredTasks } from "../../features/FilterLogic";
import Filters from "../../components/filters/Filters";
import PaginateComponent, {
  paginate,
} from "../../components/pagination/Paginate";

export default function Home() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const tasks = useSelector((state) => state.tasks.allTasks);
  const filters = useSelector((state) => state.filters.homeFilters);
  const completedTasks = tasks?.filter(({ completed }) => completed);
  const uncompletedTasks = tasks?.filter(({ completed }) => !completed);

  const { currentPageData, pageCount, handlePageClick } = paginate(
    uncompletedTasks,
    setCurrentPage,
    currentPage
  );

  const tasksToDisplay = filteredTasks(currentPageData, filters);
  const filterActions = {
    search: filterBySearch_H,
    priority: filterByPriority_H,
    removeFilters: removeFilters_H,
    sort: sort_H,
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, []);

  return (
    <div className="home">
      <SummaryOnHome
        tasks={tasksToDisplay}
        uncompletedTasks={uncompletedTasks}
        completedTasks={completedTasks}
      />
      <div className="flex-row-jb">
        <Filters filters={filters} filterActions={filterActions} />
        <button className="primary-btn" onClick={() => setShowTaskModal(true)}>
          <FontAwesomeIcon icon={faCirclePlus} className="fa-icon" />
          <span>Create New Task</span>
        </button>
      </div>

      {Boolean(tasks?.length) && Boolean(tasksToDisplay?.length) && (
        <section className="tasks-list">
          {tasksToDisplay?.map((task) => (
            <Task key={task.id} {...task} />
          ))}
          <PaginateComponent
            currentPageData={currentPageData}
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          />
          <span
            className="completed-tasks"
            onClick={() => setShowCompletedTasks((show) => !show)}
          >
            <small>
              {showCompletedTasks ? "Hide" : "Show"} completed tasks{" "}
            </small>
            <FontAwesomeIcon
              icon={showCompletedTasks ? faCaretUp : faCaretDown}
            />
          </span>

          {showCompletedTasks &&
            completedTasks?.map((task) => <Task key={task.id} {...task} />)}
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

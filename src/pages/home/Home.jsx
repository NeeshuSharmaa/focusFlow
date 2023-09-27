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
import { CompletedTasks, NoTasks } from "./components/Helpers";

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

      {!!tasks?.length && !!tasksToDisplay?.length && (
        <section className="tasks-list">
          {tasksToDisplay?.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </section>
      )}
      {pageCount > 1 && (
        <PaginateComponent
          currentPageData={currentPageData}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      )}
      {tasks.length !== 0 && tasksToDisplay.length === 0 && (
        <NoTasks noTasksInfo="Oops! No Tasks To Display" />
      )}

      {Boolean(completedTasks.length) && (
        <CompletedTasks
          showCompletedTasks={showCompletedTasks}
          setShowCompletedTasks={setShowCompletedTasks}
          completedTasks={completedTasks}
        />
      )}
      {tasks.length === 0 && (
        <NoTasks noTasksInfo={`Click the "Create New Task" button to add`} />
      )}

      <TaskModal
        setShowTaskModal={setShowTaskModal}
        showTaskModal={showTaskModal}
      />
    </div>
  );
}

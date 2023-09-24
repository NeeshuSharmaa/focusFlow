import { useSelector } from "react-redux";

import {
  filterByPriority_I,
  filterBySearch_I,
  filterByStatus_I,
  removeFilters_I,
  sort_I,
} from "../../../features/filterSlice";
import { filteredTasks } from "../../../features/FilterLogic";
import Filters from "../../../components/filters/Filters";

import "./Styles.css";
import { getTimeHHMMSS } from "../../../features/TimeUtils";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import PaginateComponent, {
  paginate,
} from "../../../components/pagination/Paginate";

export default function Table() {
  const tasks = useSelector((state) => state.tasks.allTasks);
  const filters = useSelector((state) => state.filters.insightFilters);
  const [currentPage, setCurrentPage] = useState(0);

  const { currentPageData, pageCount, handlePageClick } = paginate(
    tasks,
    setCurrentPage,
    currentPage
  );
  const tasksToDisplay = filteredTasks(currentPageData, filters);

  const filterActions = {
    search: filterBySearch_I,
    status: filterByStatus_I,
    priority: filterByPriority_I,
    removeFilters: removeFilters_I,
    sort: sort_I,
  };

  const totalTime = (timeArr) =>
    timeArr.reduce((acc, curr) => acc + curr.elapsedTime, 0);

  return (
    <Flex direction="column" gap="2rem" justifyContent="center">
      <Filters filters={filters} filterActions={filterActions} />

      <table>
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {tasksToDisplay?.map(({ id, name, dueDate, priority, timeSpent }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{dueDate}</td>
              <td>{priority}</td>
              <td>{getTimeHHMMSS(totalTime(timeSpent))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {pageCount > 1 && (
        <PaginateComponent
          currentPageData={currentPageData}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      )}
    </Flex>
  );
}

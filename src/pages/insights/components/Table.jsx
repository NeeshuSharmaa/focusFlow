import { useDispatch, useSelector } from "react-redux";
import "./Charts.css";
import {
  filterByPriority_I,
  filterBySearch_I,
  filterByStatus_I,
  removeFilters_I,
} from "../../../features/filterSlice";
import { filteredTasks } from "../../../features/FilterLogic";

export default function Table() {
  const tasks = useSelector((state) => state.tasks.allTasks);
  const filters = useSelector((state) => state.filters.insightFilters);
  const dispatch = useDispatch();
  const tasksToDisplay = filteredTasks(tasks, filters);

  return (
    <div className="table">
      <div className="filters">
        <input
          value={filters.search}
          type="text"
          placeholder="search tasks via name or due date"
          onChange={(e) =>
            dispatch(filterBySearch_I({ search: e.target.value }))
          }
        />
        <select
          value={filters.status}
          onChange={(e) =>
            dispatch(filterByStatus_I({ status: e.target.value }))
          }
        >
          <option value="" disabled>
            Status
          </option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="both">Both</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) =>
            dispatch(filterByPriority_I({ priority: e.target.value }))
          }
        >
          <option value="" disabled>
            Priority
          </option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low"> Low</option>
          <option value="none">None</option>
        </select>
        <span onClick={() => dispatch(removeFilters_I())}>Clear filters</span>
      </div>

      <table>
        <tr>
          <th>Title</th>
          <th>Duration</th>
        </tr>

        {tasksToDisplay?.map(({ id, name, timeSpent }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>
              {" "}
              {timeSpent.reduce((acc, { elapsedTime }) => acc + elapsedTime, 0)}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

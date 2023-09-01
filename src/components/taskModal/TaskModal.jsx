import { useDispatch } from "react-redux";
import { createdNewTask } from "../../features/tasksSlice";
import "./TaskModal.css";
import { useState } from "react";

export default function TaskModal({ setShowTaskModal, showTaskModal }) {
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState({
    id: Date.now(),
    name: "",
    description: "",
    dueDate: "",
    priority: "",
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(newTask);
    dispatch(createdNewTask({ task: newTask }));
  };

  if (!showTaskModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="model-content">
        <div className="modal-header">
          <h3>Add new Task</h3>
        </div>
        <div className="modal-body">
          <div>
            {" "}
            <input
              value={newTask.name}
              type="text"
              placeholder="Name of task"
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
            <input
              value={newTask.dueDate}
              type="date"
              placeholder="Due Date"
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
              }
              required
            />
          </div>

          <textarea
            value={newTask.description}
            placeholder="Description"
            rows="5"
            cols="5"
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          />

          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, priority: e.target.value }))
            }
            required
          >
            <option disabled>Priority</option>
            <option value="high" defaultValue>
              High{" "}
            </option>
            <option value="medium">Medium </option>
            <option value="low">Low </option>
            <option value="none">No Priority</option>
          </select>
        </div>
        <div className="modal-footer">
          <span
            onClick={(e) => {
              handleFormSubmit(e);
              setShowTaskModal(false);
            }}
          >
            Add
          </span>
          <span>|</span>
          <span onClick={() => setShowTaskModal(false)}>Cancel</span>
        </div>
      </div>
    </div>
  );
}

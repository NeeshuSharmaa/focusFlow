import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { createdNewTask } from "../../../../features/tasksSlice";
import "./TaskModal.css";

export default function TaskModal({ setShowTaskModal, showTaskModal }) {
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState({
    name: "",
    dueDate: "",
    priority: "",
    completed: false,
    timeSpent: [],
  });

  const handleFormSubmit = (e) => {
    if (newTask.name && newTask.dueDate && newTask.priority) {
      e.preventDefault();

      dispatch(createdNewTask({ task: { ...newTask, id: Date.now() } }));

      setShowTaskModal(false);
      toast.success(`${newTask.name} is added to tasks`, {
        className: "toast",
      });
      setNewTask({
        name: "",
        description: "",
        dueDate: "",
        priority: "",
        completed: false,
        timeSpent: [],
      });
    } else {
      toast.warning("Please fill all the input fields", { className: "toast" });
    }
  };

  const handleCancel = () => {
    setNewTask({
      name: "",

      dueDate: "",
      priority: "",
      completed: false,
      timeSpent: [],
    });
    setShowTaskModal(false);
  };

  if (!showTaskModal) {
    return null;
  }
  return (
    <div className="modal">
      <div
        className="outside-click"
        onClick={() => setShowTaskModal(false)}
      ></div>
      <form className="modal-main">
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
            />
            <input
              value={newTask.dueDate}
              type="date"
              placeholder="Due Date"
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
              }
            />
            <span className={newTask.dueDate ? "hidden" : "due-date"}>
              Due Date
            </span>
          </div>

          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option value="" disabled>
              Priority
            </option>
            <option value="high">High </option>
            <option value="medium">Medium </option>
            <option value="low">Low </option>
            <option value="none">None</option>
          </select>
          <span className={newTask.priority ? "hidden" : "priority"}>
            Priority
          </span>
        </div>
        <div className="modal-footer">
          <span onClick={(e) => handleFormSubmit(e)}>Add</span>
          <span>|</span>
          <span onClick={handleCancel}>Cancel</span>
        </div>
      </form>
    </div>
  );
}

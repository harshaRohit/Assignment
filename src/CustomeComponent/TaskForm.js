import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ onCreateTask }) => {
  const [taskName, setTaskName] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [description, setDescription] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() !== "" && timeSpent.trim() !== "" && description.trim() !== "") {
      onCreateTask(taskName, timeSpent, description);
      setTaskName("");
      setTimeSpent("");
      setDescription("");
      setFormVisible(false);
    }
  };
  const handleShowForm = () => {
    setFormVisible(true);
  };
  return (
    <div className="task-form">
      {!formVisible && (
        <button onClick={handleShowForm}>Create Task</button>
      )}
      {formVisible && (
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Task Name</label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="form-control"
                placeholder="Task name"
              />
            </div>
            <div className="form-group col-md-4">
              <label>Time Spent (hours)</label>
              <input
                type="number"
                value={timeSpent}
                onChange={(e) => setTimeSpent(e.target.value)}
                className="form-control"
                placeholder="Time spent (hours)"
              />
            </div>
            <div className="form-group col-md-4">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                placeholder="Description"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Create Task</button>
        </form>
      )}
    </div>
  );
};

export default TaskForm;

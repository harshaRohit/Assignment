import React from "react";
import "./TaskList.css"; 

const TaskList = ({ tasks }) => {
  const totalHours = tasks.reduce((acc, task) => acc + task.timeSpent, 0);

  return (
    <div className="container mt-4">
      <h3>List of Tasks</h3>
      {tasks.length === 0 ? (
        <p className="lead">No tasks till now.</p>
      ) : (
        <>
          <p className="lead">Total Hours: {totalHours}</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Time Spent (hours)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.taskName}</td>
                  <td>{task.timeSpent}</td>
                  <td>{task.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TaskList;

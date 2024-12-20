import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Records = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    // Filter completed tasks
    const completed = todos.filter((todo) => todo.completed);
    setCompletedTasks(completed);
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-5">Completed Tasks</h1>
      <div className="row">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <div key={task.id} className="col-md-3 mb-3">
              <div className="card">
                <img
                  src="https://img.freepik.com/free-photo/overhead-view-hand-writing-spiral-notebook-gray-background_140725-141292.jpg?t=st=1734674983~exp=1734678583~hmac=855b2e22aa5f6fe0c4526d06a59a8e896effc686126cce9abc9d745958710927&w=996"
                  alt="task"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{task.name}</h5>
                  <p className="card-text">
                    Completed On: {task.timestamp || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-12">No completed tasks to display.</p>
        )}
      </div>
    </div>
  );
};

export default Records;

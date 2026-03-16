// src/components/TaskList.jsx
import React from 'react';
import { updateTask } from "../api/tasks";

export default function TaskList({ tasks, onEdit, onDelete }) {
  const handleComplete = async (task) => {
  await updateTask(task.id, {
    ...task,
    status: "Complete",
  });

  window.location.reload(); // quick refresh for now
};

  return (
    <div className="task-list">

      {tasks.map((task) => (
        <div key={task.id} className={`task-card priority-${task.priority}`}>

          <div className="task-title">
            {task.task_name}
          </div>

          <div className="task-details">
            <div><b>Priority:</b> {task.priority}</div>
            <div><b>Location:</b> {task.location}</div>
            <div><b>Due:</b> {task.due_date || "-"}</div>
            <div><b>Status:</b> {task.status}</div>
          </div>

          <div className="task-buttons">
            <div className="task-buttons">

  		{task.status !== "Complete" && (
		<button className="complete-btn" onClick={() => handleComplete(task)}>
		  Complete
		</button>		  )}

		  <button onClick={() => onEdit(task)}>
		    Edit
		  </button>

		  <button onClick={() => onDelete(task.id)}>
		    Delete
		  </button>

		</div>
          </div>

        </div>
      ))}

    </div>
  );
}
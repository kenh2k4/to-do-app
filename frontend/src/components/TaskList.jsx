// src/components/TaskList.jsx
import React from 'react';

export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-row">

          <div className="task-info">
            <strong>{task.task_name}</strong><br />
            {task.status} | {task.priority}
            {task.due_date && (
              <>
                <br />
                Due: {task.due_date}
              </>
            )}
          </div>

          <div className="task-buttons">
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>

        </div>
      ))}
    </div>
  );
}
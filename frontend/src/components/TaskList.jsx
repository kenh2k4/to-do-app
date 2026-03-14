// src/components/TaskList.jsx
import React from 'react';

export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="5" style={{ marginTop: '10px', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Priority</th>
          <th>Task Name</th>
          <th>Location</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.priority}</td>
            <td>{task.task_name}</td>
            <td>{task.location}</td>
            <td>{task.due_date}</td>
            <td>{task.status}</td>
            <td>
              <button onClick={() => onEdit(task)}>✎</button>
            </td>
            <td>
              <button onClick={() => onDelete(task.id)}>🗑</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
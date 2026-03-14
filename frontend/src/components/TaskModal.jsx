// src/components/TaskModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getLists, createTask, updateTask } from '../api/tasks';

Modal.setAppElement('#root');

export default function TaskModal({ isOpen, onClose, task, onSave }) {
  const [lists, setLists] = useState([]);
  const [formData, setFormData] = useState({
    task_name: '',
    location: '',
    priority: 2,
    status: 'Not Started',
    due_date: '',
    list_id: '',
  });

  // Fetch lists for dropdown
  useEffect(() => {
    const fetchLists = async () => {
      const data = await getLists();
      setLists(data);
    };
    fetchLists();
  }, []);

  // Pre-fill form when editing a task
  useEffect(() => {
    if (task) setFormData(task);
    else
      setFormData({
        task_name: '',
        location: '',
        priority: 2,
        status: 'Not Started',
        due_date: '',
        list_id: '',
      });
  }, [task]);

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Convert empty due_date to null
    const taskToSave = {
      ...formData,
      due_date: formData.due_date === '' ? null : formData.due_date,
    };

    if (task?.id) {
      // Editing existing task
      await updateTask(task.id, taskToSave);
    } else {
      // Adding new task
      await createTask(taskToSave);
    }

    onSave();
    onClose();
  } catch (error) {
    console.error('Failed to save task:', error);
    alert('Error saving task. Check console for details.');
  }
};

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Task Modal">
      <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Task Name:</label>
        <input
          name="task_name"
          value={formData.task_name}
          onChange={handleChange}
          required
        />

        <label>Location:</label>
        <input name="location" value={formData.location} onChange={handleChange} />

        <label>List:</label>
        <select name="list_id" value={formData.list_id} onChange={handleChange} required>
          <option value="">Select list</option>
          {lists.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>

        <label>Priority:</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Not Started</option>
          <option>Started</option>
          <option>Complete</option>
        </select>

        <label>Due Date:</label>
        <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
}
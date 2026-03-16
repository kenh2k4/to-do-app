// src/components/TaskModal.jsx

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getLists, createTask, updateTask } from "../api/tasks";

Modal.setAppElement("#root");

export default function TaskModal({ isOpen, onClose, task, onSave }) {
  const [lists, setLists] = useState([]);

  const emptyForm = {
    task_name: "",
    location: "",
    priority: 2,
    status: "Not Started",
    due_date: "",
    list_id: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // Load lists
  useEffect(() => {
    const fetchLists = async () => {
      const data = await getLists();
      setLists(data);
    };

    fetchLists();
  }, []);

  // Fill form when editing
  useEffect(() => {
    if (task) setFormData(task);
    else setFormData(emptyForm);
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const taskToSave = {
        ...formData,
        due_date: formData.due_date === "" ? null : formData.due_date,
      };

      if (task?.id) {
        await updateTask(task.id, taskToSave);
      } else {
        await createTask(taskToSave);
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Error saving task");
    }
  };

  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={onClose}
  style={{
    overlay: {
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    content: {
      backgroundColor: "#1e1e1e",
      color: "#ffffff",
      border: "1px solid #444",
      maxWidth: "600px",
      margin: "auto",
      borderRadius: "10px",
      padding: "20px",
    },
  }}
>
      <h2>{task ? "Edit Task" : "Add Task"}</h2>

      <form className="modal-form" onSubmit={handleSubmit}>
        {/* Task Name */}
        <div>
          <label>Task Name</label>
          <input
            name="task_name"
            value={formData.task_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        {/* List */}
        <div>
          <label>List</label>
          <select
            name="list_id"
            value={formData.list_id}
            onChange={handleChange}
            required
          >
            <option value="">Select list</option>

            {lists.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Not Started</option>
            <option>Started</option>
            <option>Complete</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date || ""}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="modal-buttons">
          <button type="submit">Save</button>

          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

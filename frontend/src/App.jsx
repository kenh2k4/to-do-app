import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import { getTasks, deleteTask } from './api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data);
      setLoading(false);

    } catch (err) {
      console.log("Backend not ready, retrying...");

      // retry after 2 seconds
      setTimeout(loadTasks, 2000);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Waking up server...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>To-Do List</h1>
      <button onClick={handleAdd}>Add Task</button>

      <h2>Active Tasks</h2>
      <TaskList
        tasks={tasks.filter((t) => t.status !== 'Complete')}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <h2>Completed Tasks</h2>
      <TaskList
        tasks={tasks.filter((t) => t.status === 'Complete')}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        task={editingTask}
        onSave={fetchTasks} // refresh after adding/updating
      />
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import { getTasks, deleteTask, getLists } from './api/tasks';

export default function App() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
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
  
  const loadLists = async () => {
    const data = await getLists();
    setLists(data);
  };

  useEffect(() => {
    fetchTasks();
    loadLists();
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
      <div style={{ marginBottom: "10px" }}>
        <label>List: </label>
        <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
          <option value="">All</option>

            {lists.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
          ))}
        </select>
      </div>

      <button onClick={handleAdd}>Add Task</button>

      <h2>Active Tasks</h2>
	<TaskList
	  tasks={
	    tasks
	      .filter((t) => !selectedList || t.list_id == selectedList)
	      .filter((t) => t.status !== "Complete")
	  }
	  onEdit={handleEdit}
	  onDelete={handleDelete}
	/>

      <h2>Completed Tasks</h2>
	<TaskList
	  tasks={
	    tasks
	      .filter((t) => !selectedList || t.list_id == selectedList)
	      .filter((t) => t.status === "Complete")
	  }
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
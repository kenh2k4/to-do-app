// src/api/tasks.js
import axios from 'axios';

const BASE_URL = 'https://to-do-backend-eve9.onrender.com'; // Your backend URL

export const getTasks = async () => {
  const res = await axios.get(`${BASE_URL}/tasks`);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(`${BASE_URL}/tasks`, task);
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${BASE_URL}/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/tasks/${id}`);
};

export const getLists = async () => {
  const res = await axios.get(`${BASE_URL}/lists`);
  return res.data;
};
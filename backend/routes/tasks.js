const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET /tasks?list_id=1
// Fetch tasks, optionally filtered by list_id
router.get('/', async (req, res) => {
  try {
    const { list_id } = req.query;
    let query = 'SELECT * FROM tasks';
    const params = [];

    if (list_id) {
      query += ' WHERE list_id = $1';
      params.push(list_id);
    }

    query += ' ORDER BY sort_order, priority, due_date';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// POST /tasks
// Create a new task
router.post('/', async (req, res) => {
  try {
    const {
      list_id,
      task_name,
      description,
      location,
      priority,
      status,
      due_date,
      sort_order
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks 
       (list_id, task_name, description, location, priority, status, due_date, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [list_id, task_name, description, location, priority, status, due_date, sort_order]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// PUT /tasks/:id
// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      list_id,
      task_name,
      description,
      location,
      priority,
      status,
      due_date,
      sort_order,
      completed_at
    } = req.body;

    const result = await pool.query(
      `UPDATE tasks SET
         list_id = $1,
         task_name = $2,
         description = $3,
         location = $4,
         priority = $5,
         status = $6,
         due_date = $7,
         sort_order = $8,
         completed_at = $9
       WHERE id = $10
       RETURNING *`,
      [list_id, task_name, description, location, priority, status, due_date, sort_order, completed_at, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// DELETE /tasks/:id
// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

module.exports = router;
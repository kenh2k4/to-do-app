require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // <-- import morgan

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // <-- log every request

// Routes
const listsRoutes = require('./routes/lists');
app.use('/lists', listsRoutes);
const tasksRoutes = require('./routes/tasks');
app.use('/tasks', tasksRoutes);

// Homepage
app.get('/', (req, res) => {
  res.send('To-Do API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
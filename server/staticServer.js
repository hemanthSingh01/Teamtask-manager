const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

// API routes
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/projects', require('./server/routes/projects'));
app.use('/api/tasks', require('./server/routes/tasks'));

// Serve React frontend for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

module.exports = app;

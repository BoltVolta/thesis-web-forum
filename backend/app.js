const express = require('express');
const cors = require('cors');
const topics = require('./routes/topics');
const posts = require('./routes/posts');
const users = require('./routes/users');
const reports = require('./routes/reports');
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.json());

function handleHttpError(err, req, res, next) {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
}
app.use(handleHttpError);
app.use('/api/topics', topics);
app.use('/api/threads', posts);
app.use('/api/users', users);
app.use('/api/reports', reports);

app.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = app;
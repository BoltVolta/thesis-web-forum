const express = require('express');
const cors = require('cors');
const topics = require('./routes/topics');
const posts = require('./routes/posts');
const users = require('./routes/users');
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors({
  origin: [
    'http://localhost:5173/',
    'static page link'
  ]
}));
app.use(express.json());

app.use('/api/topics', topics);
app.use('/api/threads', posts);
app.use('/api/users', users);

app.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = app;
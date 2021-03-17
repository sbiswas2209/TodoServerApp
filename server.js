const express = require("express");
const db = require('./db');
const cors = require("cors");
const auth = require('./auth')
const tasks = require('./tasks')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

app.use('/auth', auth.authRouter)

app.use('/tasks', tasks.tasksRouter)

app.get("/", (req, res) => {
  res.status(200).json({
    message: `Server started on port ${port}`,
  });
});

app.use('*', (req,res) => {
  res.status(404).json({
    message: 'Route not found!!!'
  })
})

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port ${port}`);
  }
});

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users/user');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', userRouter);

module.exports = app;

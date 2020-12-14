// import express from 'express';
const express = require('express');
const path = require('path');

const app = express();
const helmet = require('helmet');

const indexRouter = require('./routes');
const groupRouter = require('./routes/group');
const memberRouter = require('./routes/member');
const dateRouter = require('./routes/date');
const attendanceRouter = require('./routes/attendance');

// view engine set up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body-parserのやつ
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(helmet());

app.use('/', indexRouter);
app.use('/group', groupRouter);
app.use('/group', memberRouter);
app.use('/group', dateRouter);
app.use('/group', attendanceRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // console.log(`listening on port: ${port}`);
  console.log(`================== Welcome to Attendance App! Please connect to http://localhost:${port}/top ==================`);
});

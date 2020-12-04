// import express from 'express';
const express = require('express');
const path = require('path');

const app = express();
// const bodyParser = require('')

const indexRouter = require('./routes');
const aboutRouter = require('./routes/about');
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

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/group', groupRouter);
app.use('/group', memberRouter);
app.use('/group', dateRouter);
app.use('/group', attendanceRouter);

app.get('/hello', (req, res) => {
  // res.json({message: 'hello, world'});
  res.send('hello, world');
});

const port = process.env.PORT || 3000;
// app.listen(port);
// console.log('ポート接続：' + port);
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

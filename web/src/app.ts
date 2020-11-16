// import express from 'express';
const express = require('express');
const path = require('path');

const app = express();
// const bodyParser = require('')

const indexRouter = require('./routes/index');

// view engine set up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

app.get('/attendance/v1/hello', (req, res) => {
  // res.json({message: 'hello, world'});
  res.send('hello, world');
});

// get all students
// app.get('/attendance/v1/students', () => {});

const port = process.env.PORT || 3000;
// app.listen(port);
// console.log('ポート接続：' + port);
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

// import express from 'express';
const express = require('express');
const app = express();

app.get('/api/v1/hello', (req, res) => {
  res.json({"message": "hello, world"})
})

const port = process.env.PORT || 3000; // TODO
app.listen(port);
console.log('ポート接続：' + port);
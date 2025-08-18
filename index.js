// A minimal index.js for Genezio Express deployment

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

exports.handler = app;
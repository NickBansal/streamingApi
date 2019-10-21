const express = require('express');

const app = express();
const dummyData = require('./testData');


app.get('/api', (req, res) => {
  res.send('Home');
});

app.get('/api/streams/:userid', (req, res) => {
  const { userid } = req.params;
  const userProfile = dummyData.find((user) => user.userId === userid);
  res.send(userProfile);
});

module.exports = app;

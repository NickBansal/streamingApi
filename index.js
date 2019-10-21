const express = require('express');

const app = express();
const dummyData = require('./testData');


app.get('/api', (req, res) => {
  res.send('Home');
});

app.get('/api/streams/:userid', (req, res) => {
  const { userid } = req.params;
  const userProfile = dummyData.filter((user) => user.userId === userid);

  if (userProfile.length > 0) {
    res.send(userProfile[0]);
  } else {
    res.status(404).send({ msg: 'profile not found' });
  }
});

module.exports = app;

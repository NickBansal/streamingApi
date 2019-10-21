const express = require('express');

const app = express();
const dummyData = require('./testData');
const cors = require('cors');

app.use(cors());

app.get('/api', (req, res) => {
  res.send(dummyData);
});

app.get('/api/streams/:userid', (req, res) => {
  const { userid } = req.params;
  const userProfile = dummyData.filter((user) => user.userId === userid);
  if (userProfile.length > 0) {
    res.send(userProfile[0]);
  } else {
    res.status(400).send({ msg: 'profile not found' });
  }
});

app.put('/api/streams/:userid/increase', (req, res) => {
  const { userid } = req.params;
  const userProfile = dummyData.find((user) => user.userId === userid);

  userProfile.streamsCurrentlyWatching += 1;

  res.send(userProfile);
});


app.use('/api/*', (req, res) => res.status(404).send({ msg: `${req.originalUrl} does not exist` }));

module.exports = app;

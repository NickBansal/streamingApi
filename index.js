const express = require('express');

const app = express();
const dummyData = require('./testData');

const checkUserExists = (userid) => dummyData.filter((user) => user.userId === userid).length > 0;

app.get('/api', (req, res) => {
  res.send(dummyData);
});

app.get('/api/streams/:userid', (req, res) => {
  const { userid } = req.params;
  const userProfile = dummyData.find((user) => user.userId === userid);

  if (checkUserExists(userid)) {
    res.send(userProfile);
  } else {
    res.status(404).send({ msg: 'profile not found' });
  }
});

app.put('/api/streams/:userid/increase', (req, res) => {
  const { userid } = req.params;
  const userProfile = dummyData.find((user) => user.userId === userid);

  if (!checkUserExists(userid)) {
    res.status(404).send({ msg: 'profile not found' });
  } else if (userProfile.streamsCurrentlyWatching === 3) {
    res.status(400)
      .send({ msg: 'This user has reached their limit. Can ony watch a maximum of 3 streams at a time' });
  } else {
    userProfile.streamsCurrentlyWatching += 1;
    res.send(userProfile);
  }
});

app.put('/api/streams/:userid/decrease', (req, res) => {
  const { userid } = req.params;
  const userProfile = dummyData.find((user) => user.userId === userid);

  if (!checkUserExists(userid)) {
    res.status(404).send({ msg: 'profile not found' });
  } else if (userProfile.streamsCurrentlyWatching === 0) {
    res.status(400)
      .send({ msg: 'This user is not currently watching any streams' });
  } else {
    userProfile.streamsCurrentlyWatching -= 1;
    res.send(userProfile);
  }
});

app.use('/*', (req, res) => res.status(404).send({ msg: `${req.originalUrl} does not exist` }));

module.exports = app;

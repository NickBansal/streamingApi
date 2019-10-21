const express = require('express');

const app = express();
const dummyData = require('./testData');


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

app.patch('/api/streams/:userid?streamcount=up', (req, res) => {
  const { userid } = req.params;
  const { streamcount } = req.query;
  console.log(streamcount);
  //   const value = streams === 'up' ? 1 : -1;

  //   const userProfile = dummyData.find((user) => user.userId === userid);
  //   userProfile.streamsCurrentlyWatching += value;

  //   console.log(userid);

//   res.send({ userProfile });
});


app.use('/*', (req, res) => res.status(404).send({ msg: `${req.originalUrl} does not exist` }));

module.exports = app;

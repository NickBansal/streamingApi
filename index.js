const app = require('express')();

app.get('/api', (req, res) => {
  res.send('Home');
});

module.exports = app;

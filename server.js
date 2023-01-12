// core mods
// addon mods
const express = require('express');
const bodyParser = require('body-parser');
// custom mods
const mongodb = require('./db/connection');
// run express
const app = express();

// port
const port = process.env.PORT || 8080;

// code
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

// Initialize DB and port listening
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port:${port}.`);
    });
  }
});
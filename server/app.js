const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors')

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/routes')(app);
app.get('*', cors(), (req, res) => res.status(404).send({
  title: '404 - Not Found',
}));

module.exports = app;

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

app.get('*', cors(), (req, res) => res.status(200).send({
  title: 'Polygive.',
}));

module.exports = app;
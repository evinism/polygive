const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')
const session = require('./src/config/session');
require('./src/config/strategies');

// Set up the express app
const app = express();
app.use(session)
app.use(passport.initialize());
app.use(passport.session());

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/routes')(app);
app.get('*', cors(), (req, res) => res.status(404).send({
  title: '404 - Not Found',
}));

module.exports = app;

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import session from './src/config/session';
import configureRoutes from './src/routes';
import './src/config/strategies';

// Set up the express app
const app = express();
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

configureRoutes(app);
app.get('*', cors(), (req, res) => res.status(404).send({
  title: '404 - Not Found',
}));

module.exports = app;

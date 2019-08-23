const controllers = require('../controllers');
const {requireLogin, ensureSuper} = require('./util');

var cors = require('cors');
var passport = require('passport');

const corsConfig = ({
  credentials: true,
  origin: process.env.FRONTEND_URL,
});

module.exports = (app) => {
  /* Public Routes */
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect(process.env.FRONTEND_URL);
    });

  app.get('/user/current',
    cors(corsConfig),
    controllers.user.current);
  
  /* Routes that 403 when not logged in */
  app.get(
    '/charities',
    cors(corsConfig),
    requireLogin(controllers.charity.list));

  app.post(
    '/donations',
    cors(corsConfig),
    requireLogin(controllers.donation.create));

  app.get(
    '/donations',
    cors(corsConfig),
    requireLogin(controllers.donation.list));

  /* Super-only routes */
  app.post(
    '/charities',
    cors(corsConfig),
    ensureSuper(controllers.charity.create));

  app.get(
    '/all_donations/',
    cors(corsConfig),
    ensureSuper(controllers.donation.all));

  app.options("/*", cors(corsConfig), function(req, res, next){
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    //res.header('Access-Control-Max-Age', '1000');
    res.sendStatus(200);
  });
};
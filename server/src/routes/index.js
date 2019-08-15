const charitiesController = require('../controllers').charity;
var cors = require('cors');
var passport = require('passport');

const corsConfig = ({
  credentials: true,
  origin: process.env.FRONTEND_URL,
});

module.exports = (app) => {
  app.get('/', cors(corsConfig),
    (req, res) => {
      const title = req.isAuthenticated() ? 'Welcome, ' + req.user : 'Polygive.';
      return res.status(200).send({title});
    });

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect(process.env.FRONTEND_URL);
    });

  app.post('/charities', cors(corsConfig), charitiesController.create);
  app.get('/charities', cors(corsConfig), charitiesController.list);
};
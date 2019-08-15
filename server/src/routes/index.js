const controllers = require('../controllers');


var cors = require('cors');
var passport = require('passport');

const corsConfig = ({
  credentials: true,
  origin: process.env.FRONTEND_URL,
});

module.exports = (app) => {
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect(process.env.FRONTEND_URL);
    });

  app.get('/user/current', cors(corsConfig), controllers.user.current);
  app.post('/charities', cors(corsConfig), controllers.charity.create);
  app.get('/charities', cors(corsConfig), controllers.charity.list);
};
import passport from 'passport';
import Strategies from 'passport-google-oauth';
import models from '../../src2/models';
const User = models.User;
const GoogleStrategy = Strategies.OAuth2Strategy;

passport.serializeUser(function(user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findAll({where: {id}})
    .then((users) => {
      done(null, users[0])
    });
});

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      where: {
        // There's probably something better to do here, like ask
        // which email someone wants to associate
        email: profile.emails[0].value,
      }, 
      defaults: {
        name: profile.displayName,
        googleId: profile.id,
      } 
    }).then((users) => {
      return cb(null, users[0]);
    });
  }
));
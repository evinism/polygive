import passport from 'passport';
import Strategies from 'passport-google-oauth';
import User from '../entity/User';
import {getRepository} from 'typeorm';
const GoogleStrategy = Strategies.OAuth2Strategy;
import ensureConnection from '../connection';

passport.serializeUser(function(user: User, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  await ensureConnection();
  getRepository(User)
    .findOne({where: {id}})
    .then(user => {
      done(null, user)
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
  async function(accessToken, refreshToken, profile, cb) {
    await ensureConnection();
    getRepository(User)
      .findOne({      
        where: {
          // There's probably something better to do here, like ask
          // which email someone wants to associate
          email: profile.emails[0].value,
        }
      })
      .then((user) => {
        if (user) {
          return user;
        }
        const newUser = new User();
        newUser.email = profile.emails[0].value;
        newUser.name = profile.displayName,
        newUser.googleId = profile.id;
        newUser.super = false;
        return getRepository(User).save(newUser);
      })
      .then((user) => {
        return cb(null, user);
      });
  }
));
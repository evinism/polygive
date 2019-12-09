import passport from 'passport';
import GoogleStrategies from 'passport-google-oauth';
import LocalStrategy from 'passport-local';
import User from '../entity/User';
import {getRepository} from 'typeorm';
import ensureConnection from '../connection';
import bcrypt from 'bcrypt';

const GoogleStrategy = GoogleStrategies.OAuth2Strategy;

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

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function(email: string, password: string, done) {
    await ensureConnection();
    getRepository(User)
      .findOne({ where: { email } })
      .then((user) => {
        // Every user has a password, but sometimes
        if (!user || !user.password || !bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user);
      }).catch((err) => {
        if (err) {
          return done(err); 
        }
      });
  }
));

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
          // If a user logs in with Google, but they have an account with that
          // email already, we just associate it automatically.
          if (!user.googleId) {
            user.googleId = profile.id;
            return getRepository(User).save(user);
          } else {
            return user;
          }
        }
        const newUser = new User();
        newUser.email = profile.emails[0].value;
        newUser.name = profile.displayName,
        newUser.googleId = profile.id;
        newUser.password = null; // This is sp00ky but no password should work here.
        newUser.super = false;
        return getRepository(User).save(newUser);
      })
      .then((user) => {
        return cb(null, user);
      });
  }
));
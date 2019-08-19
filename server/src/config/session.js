var session = require('express-session');
const RedisStore = require('connect-redis')(session);

let sessionConfig = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
};
if (process.env.REDIS_HOST) {
  sessionConfig.store = new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB || 0,
    pass: process.env.REDIS_PASS,
    socket: process.env.REDIS_SOCKET,
  });
}

module.exports = session(sessionConfig);

import session, {SessionOptions} from 'express-session';
import redisStoreConstructor from 'connect-redis';

const RedisStore = redisStoreConstructor(session);

let sessionConfig : SessionOptions = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  store: undefined,
};

if (process.env.REDIS_HOST) {
  sessionConfig.store = new RedisStore({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '', 10) || 6379,
    db: parseInt(process.env.REDIS_DB || '', 10) || 0,
    pass: process.env.REDIS_PASS,
    socket: process.env.REDIS_SOCKET,
  });
}

export default session(sessionConfig);

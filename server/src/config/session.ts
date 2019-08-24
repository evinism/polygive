import session, {SessionOptions} from 'express-session';
import redisStoreConstructor from 'connect-redis';
import {REDIS_HOST, REDIS_PORT, REDIS_DB, REDIS_PASS, REDIS_SOCKET, SESSION_SECRET} from './env';

const RedisStore = redisStoreConstructor(session);

let sessionConfig : SessionOptions = {
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: undefined,
};

if (process.env.REDIS_HOST) {
  sessionConfig.store = new RedisStore({
    host: REDIS_HOST,
    port: REDIS_PORT,
    db: REDIS_DB,
    pass: REDIS_PASS,
    socket: REDIS_SOCKET,
  });
}

export default session(sessionConfig);

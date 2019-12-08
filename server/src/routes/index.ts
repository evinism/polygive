import { Express, Router } from 'express';
import RestypedRouter from 'restyped-express-async'
import cors from 'cors';
import passport from 'passport';
import controllers from '../controllers';
import {requireLogin, ensureSuper} from './util';
import { FRONTEND_URL } from '../config/env';
import PolygiveApi from '../../shared/polygiveApi';


const corsConfig = ({
  credentials: true,
  origin: FRONTEND_URL,
});

const curr = controllers.user.current;

export default function ConfigureRoutes(app: Express){

  /* Public Routes */
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect(FRONTEND_URL);
    });

  const apiRouter = Router();
  apiRouter.all('*', cors(corsConfig));
  app.use('/', apiRouter);

  const api = RestypedRouter<PolygiveApi>(apiRouter);

  api.get('/user/current', controllers.user.current);
  
  /* Routes that 403 when not logged in */
  apiRouter.get('/charities', requireLogin);
  api.get('/charities', controllers.charity.list);

  apiRouter.get('/donations', requireLogin);
  api.get('/donations', controllers.donation.list);

  apiRouter.post('/donations', requireLogin);
  api.post('/donations', controllers.donation.create);

  /* Super-only routes */
  apiRouter.post('/charities', ensureSuper);
  api.post(
    '/charities',
    controllers.charity.create);
  
  apiRouter.get('all_donations', ensureSuper);
  api.get(
    '/all_donations',
    controllers.donation.all);

  app.options("/*", cors(corsConfig), function(req, res, next){
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    //res.header('Access-Control-Max-Age', '1000');
    res.sendStatus(200);
  });
};
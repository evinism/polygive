import { Express, Router } from 'express';
import RestypedRouter from 'restyped-express-async'
import cors from 'cors';
import passport from 'passport';
import controllers from '../controllers';
import {requireLogin, requireSuper} from './util';
import { FRONTEND_URL } from '../config/env';
import PolygiveApi from '../../shared/polygiveApi';


const corsConfig = ({
  credentials: true,
  origin: FRONTEND_URL,
});

export default function ConfigureRoutes(app: Express){

  /* Auth, non-api routes */
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect(FRONTEND_URL);
    });

  app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect(FRONTEND_URL);
    });
  
  app.post('/signup', controllers.signup);

  const apiRouter = Router();
  apiRouter.all('*', cors(corsConfig));
  app.use('/', apiRouter);

  const api = RestypedRouter<PolygiveApi>(apiRouter);

  api.get('/user/current', controllers.user.current);
  
  /* Routes that 403 when not logged in */
  //apiRouter.get('/charities', requireLogin);
  api.get('/charities', requireLogin(controllers.charity.list));
  api.get('/donations', requireLogin(controllers.donation.list));
  api.post('/donations', requireLogin(controllers.donation.create));

  /* Super-only routes */
  api.post('/charities', requireSuper(controllers.charity.create));
  api.get('/all_donations', requireSuper(controllers.donation.all));

  app.options("/*", cors(corsConfig), function(req, res, next){
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.sendStatus(200);
  });
};
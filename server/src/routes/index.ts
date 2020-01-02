import { Express, Router, Request } from 'express';
import RestypedRouter, { TypedRequest } from 'restyped-express-async'
import cors from 'cors';
import passport from 'passport';
import controllers from '../controllers';
import {requireLogin, requireSuper} from './accessControl';
import { FRONTEND_URL } from '../config/env';
import PolygiveApi from '../../shared/polygiveApi';
import { RTHandler } from '../types/RestypedHelpers';
import { RestypedRoute } from 'restyped';


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
    passport.authenticate('local', { failureRedirect: FRONTEND_URL }),
    function(req, res) {
      res.redirect(FRONTEND_URL);
    });
  
  app.post('/signup', controllers.signup);

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect(FRONTEND_URL);
  });

  const apiRouter = Router();
  apiRouter.all('*', cors(corsConfig));
  app.use('/', apiRouter);

  const api = RestypedRouter<PolygiveApi>(apiRouter);
  const proof = <T extends RestypedRoute> 
    (handler: RTHandler<T, TypedRequest<T>>) => (handler);


  api.get('/user/current', controllers.user.current);
  
  /* Routes that 403 when not logged in */
  api.get('/charities', requireLogin(controllers.charity.list));
  api.get('/charities/:id', requireLogin(controllers.charity.getCharity));

  api.get('/donations', requireLogin(controllers.donation.list));
  api.post('/donations', requireLogin(controllers.donation.create));
  api.get('/donation_schedules',
    requireLogin(controllers.donationSchedule.list));
  api.post('/donation_schedules',
    requireLogin(controllers.donationSchedule.create));
  api.patch('/donation_schedules/:id',
    requireLogin(controllers.donationSchedule.patch));


  /* Super-only routes */
  api.post('/charities', requireSuper(controllers.charity.create));
  api.get('/all_donations', requireSuper(controllers.donation.all));
  api.get('/unflushed_donations', requireSuper(controllers.donation.unflushed));

  app.options("/*", cors(corsConfig), function(req, res, next){
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.sendStatus(200);
  });
};
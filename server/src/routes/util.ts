import { RequestHandler } from "express";
import { RestypedRoute } from 'restyped';
import { RTHandler, success, error } from '../controllers/util';
import { promises } from "dns";


// The following are entirely untyped, which is just a little horrifying given
// that it's core auth stuff.
export function requireLogin<T extends RestypedRoute>(handlerFn: RTHandler<T>): RTHandler<T> {
  return function(req, res){
    if (req.isAuthenticated()) {
      return handlerFn(req, res);
    } else {
      return Promise.resolve(error(res, 401)({error: 'unauthorized'}));
    }
  };
}

export function requireSuper<T extends RestypedRoute>(handlerFn: RTHandler<T>): RTHandler<T> {
  return requireLogin(function(req, res){
    if ((req.user as any).super) {
      return handlerFn(req, res);
    } else {
      return Promise.resolve(error(res, 401)({error: 'unauthorized'}));
    }
  });
}

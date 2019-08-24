import {RequestHandler} from 'express';

export function requireLogin(handlerFn: RequestHandler) : RequestHandler{
  return function(req, res, next){
    if (req.isAuthenticated()) {
      handlerFn(req, res, next);
    } else {
      res.status(401).send({
        error: 'unauthorized',
      });
    }
  }
}

export function ensureSuper(handlerFn: RequestHandler): RequestHandler {
  return requireLogin(function(req, res, next){
    // Typing issue:
    if ((req.user as any).super) {
      handlerFn(req, res, next);
    } else {
      res.status(401).send({
        error: 'unauthorized',
      });
    }
  });
}

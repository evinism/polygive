import {RequestHandler} from 'express';

function requireLogin(handlerFn: RequestHandler) : RequestHandler{
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

function ensureSuper(handlerFn: RequestHandler): RequestHandler {
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

module.exports = {
  requireLogin,
  ensureSuper,
};

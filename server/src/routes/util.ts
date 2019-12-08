import { RequestHandler } from "express";

// The following are entirely untyped, which is just a little horrifying given
// that it's core auth stuff.
export function requireLogin(handlerFn: RequestHandler): RequestHandler {
  return function(req, res, next){
    if (req.isAuthenticated()) {
      (handlerFn as any)(req, res, next);
    } else {
      res.status(401).send({
        error: 'unauthorized',
      });
    }
  };
}

export function ensureSuper(handlerFn: RequestHandler): RequestHandler {
  return requireLogin(function(req, res, next){
    if ((req.user as any).super) {
      handlerFn(req, res, next);
    } else {
      res.status(401).send({
        error: 'unauthorized',
      });
    }
  });
}

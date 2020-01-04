import { RestypedRoute } from "restyped";
import { error } from "../util";
import { TypedRequest } from "restyped-express-async";
import User from "../entity/User";
import {
  RTR,
  AuthenticatedRequest,
  SuperRequest,
  RTHandler,
  RTSuperHandler,
  RTAuthedHandler
} from "../types/RestypedHelpers";

export function proveAuthed<T extends RTR>(
  req: TypedRequest<T>
): AuthenticatedRequest<T> {
  const newReq = req as AuthenticatedRequest<T>;
  newReq.authed = true;
  newReq.pgUser = req.user as User;
  return newReq;
}

export function requireLogin<T extends RestypedRoute>(
  handlerFn: RTAuthedHandler<T>
): RTHandler<T, TypedRequest<T>> {
  return function(req, res) {
    if (req.isAuthenticated()) {
      return handlerFn(proveAuthed(req), res);
    } else {
      return Promise.resolve(error(res, 401)({ error: "unauthorized" }));
    }
  };
}

export function proveSuper<T extends RTR>(
  req: AuthenticatedRequest<T>
): SuperRequest<T> {
  const newReq = req as SuperRequest<T>;
  newReq.isSuperRequest = true;
  return newReq;
}

export function requireSuper<T extends RestypedRoute>(
  handlerFn: RTSuperHandler<T>
): RTHandler<T> {
  return requireLogin(function(req, res) {
    if (req.pgUser.super) {
      return handlerFn(proveSuper(req), res);
    } else {
      return Promise.resolve(error(res, 401)({ error: "unauthorized" }));
    }
  });
}

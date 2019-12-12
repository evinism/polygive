import { Response } from 'express';
import { RestypedRoute } from 'restyped';
import { RTHandler, error } from '../util';
import { TypedRequest } from 'restyped-express-async';
import User from '../entity/User';

// lol alias
export type RTR = RestypedRoute;

export interface AuthenticatedRequest<T extends RTR> extends TypedRequest<T> {
  authed: true;
  pgUser: User;
}

export interface SuperRequest<T extends RTR> extends AuthenticatedRequest<T> {
  isSuperRequest: true;
}

export type RTHandler<T extends RestypedRoute, R extends TypedRequest<T> = TypedRequest<T>> = 
  (req: R, res: Response) => Promise<T['response']>;

export type RTAuthedHandler<T extends RTR> =
  RTHandler<T, AuthenticatedRequest<T>>;

export type RTSuperHandler<T extends RTR> =
  RTHandler<T, SuperRequest<T>>;

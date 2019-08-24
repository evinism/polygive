import {RequestHandler} from 'express';
import {
  CreateCharityRequest,
  CreateCharityResponse,
  ListCharitiesResponse,
} from './../shared/apiTypes';
import models from '../models';

// oof on typing here.
const Charity = models.Charity;

export const create: RequestHandler =  (req, res) => {
  const body: CreateCharityRequest = req.body;
  return Charity
    .create({
      title: body.name,
    })
    .then((charity: CreateCharityResponse) => res.status(201).send(charity))
    .catch((error: any) => res.status(400).send(error));
};

export const list: RequestHandler = (req, res) => {
  return Charity
    .findAll()
    .then((charities: ListCharitiesResponse) => res.status(200).send(charities))
    .catch((error: any) => res.status(400).send(error));
};

export default { create, list };
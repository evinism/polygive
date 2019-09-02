import {RequestHandler} from 'express';
import {getRepository} from 'typeorm';
import ensureConnection from '../connection';
import Charity from '../entity/Charity';
import {
  CreateCharityRequest,
  CreateCharityResponse,
  ListCharitiesResponse,
} from '../../shared/apiTypes';

export const create: RequestHandler =  async (req, res) => {
  await ensureConnection();
  const body: CreateCharityRequest = req.body;

  const newCharity = new Charity();
  newCharity.name = body.name;
  getRepository(Charity)
    .save(newCharity)
    .then(charity => res.status(201).send(charity))
    .catch((error: any) => res.status(400).send(error));
};

export const list: RequestHandler = async (req, res) => {
  await ensureConnection();

  getRepository(Charity)
    .find()
    // Get this to typecheck
    .then(charities => res.status(201).send(charities.map(cty => ({title: cty.name}))))
    .catch((error: any) => res.status(400).send(error));
};

export default { create, list };
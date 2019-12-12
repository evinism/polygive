import {getRepository} from 'typeorm';
import ensureConnection from '../connection';
import Charity from '../entity/Charity';
import PolygiveApi from '../../shared/polygiveApi';
import {RTHandler, success, error} from '../util';
import {RTSuperHandler} from '../types/RestypedHelpers';
import { shortCharity } from '../projections';

/** TODO: Remove the toStrings here */
type CreateCharity = PolygiveApi['/charities']['POST'];
export const create: RTSuperHandler<CreateCharity> = async (req, res) => {
  await ensureConnection();
  const body = req.body;
  const newCharity = new Charity();
  newCharity.name = body.name;
  return getRepository(Charity)
    .save(newCharity)
    .then((charity) => ({
      name: charity.name,
      id: charity.id.toString(),
    }))
    .then(success(res, 201))
    .catch(error(res, 400));
};

type ListCharity = PolygiveApi['/charities']['GET'];
export const list: RTHandler<ListCharity> = async (_, res) => {
  await ensureConnection();

  return getRepository(Charity)
    .find()
    .then(charities => charities.map(shortCharity))
    .then(success())
    .catch(error(res, 400));
};

export default { create, list };
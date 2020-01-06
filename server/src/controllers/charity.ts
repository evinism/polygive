import { getRepository, QueryBuilder } from "typeorm";
import ensureConnection from "../connection";
import Charity from "../entity/Charity";
import PolygiveApi from "../../shared/polygiveApi";
import { RTHandler, success, error } from "../util";
import { RTSuperHandler } from "../types/RestypedHelpers";
import { shortCharity } from "../projections";

/** TODO: Remove the toStrings here */
type CreateCharity = PolygiveApi["/charities"]["POST"];
export const create: RTSuperHandler<CreateCharity> = async (req, res) => {
  await ensureConnection();
  const body = req.body;
  const newCharity = new Charity();
  newCharity.name = body.name;
  return getRepository(Charity)
    .save(newCharity)
    .then(charity => ({
      name: charity.name,
      id: charity.id
    }))
    .then(success(res, 201))
    .catch(error(res, 400));
};

type ListCharity = PolygiveApi["/charities"]["GET"];
export const list: RTHandler<ListCharity> = async (req, res) => {
  await ensureConnection();
  const queryWithoutWhereClause = getRepository(Charity)
    .createQueryBuilder("charity")
    .take(10)
    .orderBy("charity.id", "DESC");

  const search = req.query.search;
  // Really evin???
  const fullQuery = search
    ? queryWithoutWhereClause.where("charity.name like :query", {
        query: "%" + (req.query.search || "") + "%"
      })
    : queryWithoutWhereClause;

  return fullQuery
    .getMany()
    .then(charities => charities.map(shortCharity))
    .then(success())
    .catch(error(res, 400));
};

type GetCharity = PolygiveApi["/charities/:id"]["GET"];
export const getCharity: RTHandler<GetCharity> = async (req, res) => {
  await ensureConnection();

  return getRepository(Charity)
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(shortCharity)
    .then(success())
    .catch(error(res, 400));
};

export default { create, list, getCharity };

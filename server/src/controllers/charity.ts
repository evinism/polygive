import { getRepository, QueryBuilder, SelectQueryBuilder } from "typeorm";
import ensureConnection from "../connection";
import Charity from "../entity/Charity";
import PolygiveApi from "../../shared/polygiveApi";
import { RTHandler, success, error } from "../util";
import { RTSuperHandler } from "../types/RestypedHelpers";
import { shortCharity } from "../projections";

const CHARITY_RESULTS_PER_PAGE = 10;

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
  const page = Math.max(Math.floor(req.query.page || 1), 1);
  const search = req.query.search;

  const withWhereClause = (queryBuilder: SelectQueryBuilder<Charity>) => {
    return search
      ? queryBuilder.where("charity.name like :query", {
          query: "%" + (req.query.search || "") + "%"
        })
      : queryBuilder;
  };

  const fullQuery = withWhereClause(
    getRepository(Charity)
      .createQueryBuilder("charity")
      .skip(CHARITY_RESULTS_PER_PAGE * (page - 1))
      .take(CHARITY_RESULTS_PER_PAGE)
      .orderBy("charity.name", "DESC")
  );

  return fullQuery
    .getManyAndCount()
    .then(([charities, totalCount]) => ({
      page,
      totalPages: Math.ceil(totalCount / CHARITY_RESULTS_PER_PAGE),
      data: charities.map(shortCharity)
    }))
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

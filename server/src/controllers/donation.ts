import {RequestHandler} from 'express';
import {
  ListDonationsResponse, 
  CreateDonationRequest, 
  CreateDonationResponse,  
} from '../../shared/apiTypes';
import ensureConnection from '../connection';

import models from '../../src2/models';
const OldDonation: any = models.Donation;

export const create: RequestHandler = async (req, res) => {
  const body: CreateDonationRequest = req.body;
  await ensureConnection();
  return OldDonation
    .create({
      charityId: body.charityId,
      userId: (req.user as any).id,
      amount: body.amount,
      status: 'PENDING',
    })
    .then((donation: CreateDonationResponse) => res.status(201).send(donation))
    .catch((error: any) => res.status(400).send(error));
};

export const list: RequestHandler = async (req, res) => {
  await ensureConnection();
  return OldDonation
    .findAll({
      where: {
        userId: (req.user as any).id,
      }
    })
    .then((donations: ListDonationsResponse) => res.status(200).send(donations))
    .catch((error: any) => res.status(400).send(error));
};

export const all: RequestHandler =  async (req, res) => {
  await ensureConnection();
  return OldDonation
    .findAll()
    .then((donations: ListDonationsResponse) => res.status(200).send(donations))
    .catch((error: any) => res.status(400).send(error));
};

export default {create, list, all};
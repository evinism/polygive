import {RequestHandler} from 'express';
import {
  ListDonationsResponse, 
  CreateDonationRequest, 
  CreateDonationResponse,  
} from '../shared/apiTypes';
import models from '../models';
const Donation: any = models.Donation;

export const create: RequestHandler = (req, res) => {
  const body: CreateDonationRequest = req.body;
  return Donation
    .create({
      charityId: req.body.charityId,
      userId: (req.user as any).id,
      amount: req.body.donationAmount,
      status: 'PENDING',
    })
    .then((donation: CreateDonationResponse) => res.status(201).send(donation))
    .catch((error: any) => res.status(400).send(error));
};

export const list: RequestHandler = (req, res) => {
  return Donation
    .findAll({
      where: {
        userId: (req.user as any).id,
      }
    })
    .then((donations: ListDonationsResponse) => res.status(200).send(donations))
    .catch((error: any) => res.status(400).send(error));
};

export const all: RequestHandler = (req, res) => {
  return Donation
    .findAll()
    .then((donations: ListDonationsResponse) => res.status(200).send(donations))
    .catch((error: any) => res.status(400).send(error));
};

export default {create, list, all};
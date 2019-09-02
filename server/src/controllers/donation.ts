import {RequestHandler} from 'express';
import {getRepository} from 'typeorm';
import Donation, {DonationStatus} from '../entity/Donation';
import {
  ListDonationsResponse, 
  CreateDonationRequest, 
  CreateDonationResponse,  
} from '../../shared/apiTypes';
import ensureConnection from '../connection';

export const create: RequestHandler = async (req, res) => {
  const body: CreateDonationRequest = req.body;
  await ensureConnection();
  const donation = new Donation();
  donation.charityId = parseInt(body.charityId, 10);
  donation.userId = (req.user as any).id;
  donation.amount = parseFloat(req.body.donationAmount);
  donation.status = DonationStatus.PENDING;
  getRepository(Donation)
    .save(donation)
    .then((donation) => res.status(201).send(donation))
    .catch((error: any) => res.status(400).send(error));
};

export const list: RequestHandler = async (req, res) => {
  await ensureConnection();
  getRepository(Donation)
    .find(({
      where: {
        userId: (req.user as any).id,
      }
    }))
    .then((donations) => res.status(200).send(donations))
    .catch((error: any) => res.status(400).send(error));
};

export const all: RequestHandler =  async (req, res) => {
  await ensureConnection();
  getRepository(Donation)
    .find()
    .then((donations) => res.status(200).send(donations))
    .catch((error: any) => res.status(400).send(error));
};

export default {create, list, all};
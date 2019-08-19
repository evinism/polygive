const Donation = require('../models').Donation;

module.exports = {
  create(req, res) {
    return Donation
      .create({
        charityId: req.body.charityId,
        userId: req.user.id,
        amount: req.body.donationAmount,
        status: 'pending',
      })
      .then(donation => res.status(201).send(donation))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Donation
      .findAll({
        where: {
          userId: req.user.id,
        }
      })
      .then(donations => res.status(200).send(donations))
      .catch(error => res.status(400).send(error));
  },
};
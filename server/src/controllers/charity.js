const Charity = require('../models').Charity;

module.exports = {
  create(req, res) {
    return Charity
      .create({
        title: req.body.name,
      })
      .then(charity => res.status(201).send(charity))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Charity
      .findAll()
      .then(charities => res.status(200).send(charities))
      .catch(error => res.status(400).send(error));
  },
};
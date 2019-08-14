const charitiesController = require('../controllers').charity;

module.exports = (app) => {
  app.get('/', (req, res) => res.status(200).send({
    title: 'Polygive.',
  }));

  app.post('/charities', charitiesController.create);
  app.get('/charities', charitiesController.list);
};
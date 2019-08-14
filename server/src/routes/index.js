const charitiesController = require('../controllers').charity;
var cors = require('cors')

module.exports = (app) => {
  app.get('/', cors(), (req, res) => res.status(200).send({
    title: 'Polygive.',
  }));

  app.post('/charities', cors(), charitiesController.create);
  app.get('/charities', cors(), charitiesController.list);
};
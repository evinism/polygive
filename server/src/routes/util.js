function requireLogin(handlerFn){
  return function(req, res){
    if (req.isAuthenticated()) {
      handlerFn(req, res);
    } else {
      res.status(401).send({
        error: 'unauthorized',
      });
    }
  }
}

module.exports = {
  requireLogin
};
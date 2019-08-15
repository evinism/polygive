module.exports = {
  current(req, res) {
    let result;
    if(req.isAuthenticated()){
      result = {
        loggedIn: true,
        name: req.user.name,
      }
    } else {
      result = {
        loggedIn: false,
      }
    }
    return res.status(200).send(result);
  },
};
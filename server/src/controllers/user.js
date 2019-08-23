module.exports = {
  current(req, res) {
    let result;
    if(req.isAuthenticated()){
      const {
        id,
        name,
        email,
        // this doesn't match db because i think it'd be annoying
        // to work around limitations in js syntax
        super: isSuper,
      } = req.user;
      
      result = {
        id,
        email,
        name,
        isSuper,
        loggedIn: true,
      };
    } else {
      result = {
        loggedIn: false,
      }
    }
    return res.status(200).send(result);
  },
};
import {RequestHandler} from 'express';
import {CurrentUserResponse} from '../../shared/apiTypes';

const current: RequestHandler = (req, res) => {
  let result: CurrentUserResponse;
  if(req.isAuthenticated()){
    const {
      id,
      name,
      email,
      super: isSuper,
    } = (req.user as {
      id: string, 
      name: string,
      email: string,
      super: boolean,
    });
    
    result = {
      loggedIn: true,
      user: {
        id,
        email,
        name,
        isSuper,
      }
    };
  } else {
    result = {
      loggedIn: false,
    }
  }
  return res.status(200).send(result);
};

export default { current };
import PolygiveApi, {CurrentUserResponse} from '../../shared/polygiveApi';
import {RTHandler, success} from './util';

type GetCurrentUser = PolygiveApi['/user/current']['GET'];
const current: RTHandler<GetCurrentUser> = (req, res) => {
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
  return Promise.resolve(success()(result));
};

export default { current };
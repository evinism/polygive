import PolygiveApi, {CurrentUserResponse} from '../../shared/polygiveApi';
import {RTHandler, success} from './util';
import {proveAuthed} from '../routes/accessControl';

type GetCurrentUser = PolygiveApi['/user/current']['GET'];
const current: RTHandler<GetCurrentUser> = (req, res) => {
  let result: CurrentUserResponse;
  if(req.isAuthenticated()){
    const {
      id,
      name,
      email,
      super: isSuper,
    } = proveAuthed(req).pgUser;
    
    result = {
      loggedIn: true,
      user: {
        id: id.toString(),
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
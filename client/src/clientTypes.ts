import { UserResponse } from './apiTypes';


// The fact that these two are separate is dumb
export type AppState = {
  loading: boolean,
  user?: UserResponse,
};

export type LoggedInAppState = {
  loading: boolean,
  user: UserResponse,
}

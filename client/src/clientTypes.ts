import { CurrentUserResponse } from './shared/apiTypes';

// The fact that these two are separate is dumb
export type AppState = {
  loading: boolean,
  user?: CurrentUserResponse,
};

export type LoggedInAppState = {
  loading: boolean,
  user: CurrentUserResponse,
}

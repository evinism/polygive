import { UserRecord } from '../../server/shared/apiTypes';

export type LoadingUserAppState = {
  status: 'LOADING_USER',
}

export type LoggedOutAppState = {
  status: 'LOGGED_OUT',
};

export type LoggedInAppState = {
  status: 'LOGGED_IN',
  user: UserRecord,
}

export type AppState = LoadingUserAppState | LoggedOutAppState | LoggedInAppState;

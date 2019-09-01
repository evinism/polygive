import { UserRecord } from '../../server/shared/apiTypes';
import { ReactNode } from 'react';

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

/* Should probably make these generic in type of state, but whatever for now */
export type LayoutProps =  {
  children: ReactNode
  state: LoggedInAppState,
}
export type PageProps = {
  state: LoggedInAppState,
}

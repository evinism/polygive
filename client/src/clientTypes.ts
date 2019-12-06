import { UserRecord } from '../../server/shared/apiTypes';
import { ReactNode } from 'react';

/** App State stuff */
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

/** Page Component things */

export type LayoutProps<T extends AppState> =  {
  children: ReactNode
  state: T,
};

export type PageProps<T extends AppState> = {
  state: T,
};

export type LayoutComponent<T extends AppState = AppState> =
  ((props: LayoutProps<T>) => JSX.Element);
export type PageComponent<T extends AppState = AppState> =
  ((props: PageProps<T>) => JSX.Element);


/** Routing stuff */

export interface LoggedInPageMetadata {
  public?: false,
  path: string,
  exact?: boolean,
  name: string,
  component: PageComponent<LoggedInAppState>,
  layout?: LayoutComponent<LoggedInAppState>,
  super?: boolean,
};

export interface LoggedOutPageMetadata {
  public: true,
  path: string,
  exact?: boolean,
  name: string,
  component: PageComponent<AppState>,
  layout?: LayoutComponent<AppState>,
  super?: boolean,
}

export type PageMetadata = (LoggedInPageMetadata|LoggedOutPageMetadata);
  
export interface PageManifest {
  [pageId: string]: PageMetadata
}

import { UserRecord } from '../../server/shared/polygiveApi';
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
  match: { [key: string]: any }, // oof @ these types
};

export type PageProps<T extends AppState> = {
  state: T,
  match: { [key: string]: any },
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
}

export type PageMetadata = (LoggedInPageMetadata|LoggedOutPageMetadata);
  
export interface PageManifest {
  [pageId: string]: PageMetadata
}

import React, {JSXElementConstructor} from 'react';
import { PageProps, LayoutProps, LoggedInAppState } from '../clientTypes';

export function withProps<T>(props: T) {
  return (Component: JSXElementConstructor<T>) => 
    () => 
    <Component {...props} />;
};

export const makeLayoutFn =
  (Layout: JSXElementConstructor<LayoutProps>) =>
  (Component: JSXElementConstructor<PageProps>, state: LoggedInAppState) =>
  () => (
    <Layout state={state}>
      <Component state={state} />
    </Layout>
  );

import React, {JSXElementConstructor} from 'react';
import { PageProps, LayoutProps, AppState } from './clientTypes';

export function withProps<T>(props: T) {
  return (Component: JSXElementConstructor<T>) => 
    () => 
    <Component {...props} />;
};

export const makeLayoutFn = function<T extends AppState = AppState>
    (Layout: JSXElementConstructor<LayoutProps<T>>){
  return (Component: JSXElementConstructor<PageProps<T>>, state: T) =>
    () => (
      <Layout state={state}>
        <Component state={state} />
      </Layout>
    );
}

// I'd declare this more normally but this is a tsx file
export const identity = function<T>(x: T){
  return x;
}

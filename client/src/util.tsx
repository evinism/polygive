import React, {JSXElementConstructor} from 'react';
import { AppState, PageComponent, LayoutComponent } from './clientTypes';

export function withProps<T>(props: T) {
  return (Component: JSXElementConstructor<T>) => 
    () => 
    <Component {...props} />;
};

export const makeLayoutFn = function<T extends AppState = AppState>
    (Layout: LayoutComponent<T>){
  return (Component: PageComponent<T>, state: T) =>
    () => (
      <Layout state={state}>
        <Component state={state} />
      </Layout>
    );
}

// I'd declare this more normally but this is a tsx file
export const emptyLayoutFn = function<T extends AppState = AppState>
  (Component: PageComponent<T>, state: T){
  return () => (<Component state={state} />);
}

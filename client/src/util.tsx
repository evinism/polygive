import React, {JSXElementConstructor} from 'react';
import { AppState, PageComponent, LayoutComponent } from './clientTypes';

export function withProps<T>(props: T) {
  return (Component: JSXElementConstructor<T>) => 
    () => 
    <Component {...props} />;
};

/** 
 * Depending on how well typed react-router v5 is, we might be able
 * to make this generic in match as well as appState
 */
export const makeLayoutFn = function<T extends AppState = AppState>
    (Layout: LayoutComponent<T>){
  return (Component: PageComponent<T>, state: T) =>
    ({ match }: { match: {[key: string]: any} }) => (
      <Layout state={state} match={match}>
        <Component state={state} match={match} />
      </Layout>
    );
}

// I'd declare this more normally but this is a tsx file
export const emptyLayoutFn = function<T extends AppState = AppState>
  (Component: PageComponent<T>, state: T){
  return ({ match }: { match: {[key: string]: any } }) => (
    <Component state={state} match={match} />);
}

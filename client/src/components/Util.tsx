import React, {JSXElementConstructor} from 'react';

export function withProps<T>(props: T) {
  return (Component: JSXElementConstructor<T>) => 
    () => 
    <Component {...props} />;
}

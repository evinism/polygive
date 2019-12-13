import React, {FunctionComponent, ReactNode} from 'react';
import './UIElements.css';

/* A lot of these are just kind of portable css */
export const PaddedList: FunctionComponent<{items: ReactNode[]}> = ({items}) => (
  <ol className="padded-list">
    {items.map(item => (
      <PaddedLI>
        {item}
      </PaddedLI>
    ))}
  </ol>
);

export const PaddedLI: FunctionComponent<{}> = ({children}) => (
  <li className="padded-li">
    {children}
  </li>
);

export const Card: FunctionComponent = ({children}) => (
  <div className='card'>
    {children}
  </div>
);

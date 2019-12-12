import React, {FunctionComponent} from 'react';
import './Card.css';

const Card: FunctionComponent = ({children}) => (
  <div className='card'>
    {children}
  </div>
);

export default Card;

import React, { FunctionComponent } from 'react';
import Card from '../../components/Card';
import './SingleColumn.css';


const SingleColumn: FunctionComponent = ({ children }) => (
  <article className="single-column">
    <Card>
      {children}
    </Card>
  </article>
);

export default SingleColumn;

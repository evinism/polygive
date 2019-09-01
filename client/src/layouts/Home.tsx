import React from 'react';
import { LayoutProps } from '../clientTypes';
import Header from '../components/Header';

export default function Home({children, state}: LayoutProps){
  return (
    <div>
      <Header state={state} />
      {children}
    </div>
  );
}

import React from 'react';
import { LayoutProps, LoggedInAppState } from '../../clientTypes';
import Header from './Header';

export default function Home({children, state}: LayoutProps<LoggedInAppState>){
  return (
    <div>
      <Header state={state} />
      {children}
    </div>
  );
}

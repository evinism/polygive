import React from 'react';
import { LayoutProps, LoggedInAppState } from '../../clientTypes';
import Header from './Header';
import './Home.css';

export default function Home({children, state}: LayoutProps<LoggedInAppState>){
  return (
    <div className="home-layout">
      <Header state={state} />
      <article>
        {children}
      </article>
    </div>
  );
}

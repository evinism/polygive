import React from 'react';
import { LayoutProps, LoggedInAppState } from '../../clientTypes';
import Header from '../shared/Header';
import SingleColumnArticle from '../shared/SingleColumn';
import './Home.css';

export default function Home({children, state}: LayoutProps<LoggedInAppState>){
  return (
    <div className="home-layout">
      <Header state={state} />
      <div className="home-layout-sub-header">
        <SingleColumnArticle>
          {children}
        </SingleColumnArticle>
      </div>
    </div>
  );
}

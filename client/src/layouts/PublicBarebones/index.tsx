import React from "react";
import { AppState, LayoutProps } from "../../clientTypes";
import { PublicHeader } from "../../layouts/shared/Header";
import "./PublicBarebones.css";

export default function PublicBarebones({ children }: LayoutProps<AppState>) {
  return (
    <>
      <PublicHeader />
      <article className="public-barebones-layout-sub-header">
        {children}
      </article>
    </>
  );
}

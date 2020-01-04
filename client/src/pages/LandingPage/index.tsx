import React from "react";
import { PageProps, AppState } from "../../clientTypes";
import LoginWidget from "../../components/LoginWidget";

export default function Profile(_: PageProps<AppState>) {
  return (
    <>
      <h1>Landing Page </h1>
      <LoginWidget />
    </>
  );
}

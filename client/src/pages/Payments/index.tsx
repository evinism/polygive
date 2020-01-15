import React from "react";
import { PageProps, LoggedInAppState } from "../../clientTypes";
import CreatePaymentConfigWidget from "../../components/CreatePaymentConfigWidget";

export default function Payments(props: PageProps<LoggedInAppState>) {
  return (
    <>
      <h3>Payments</h3>
      <CreatePaymentConfigWidget />
    </>
  );
}

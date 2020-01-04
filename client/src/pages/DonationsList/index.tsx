import React from "react";
import { getDonations } from "../../api";
import { PageProps, LoggedInAppState } from "../../clientTypes";
import { DonationsListFromApiFn } from "../../components/DonationList";
import DonationForm from "../../components/DonationForm";

export default function DonationsList(_: PageProps<LoggedInAppState>) {
  return (
    <>
      <h2>Donations</h2>
      <DonationsListFromApiFn apiFn={getDonations} />
      <DonationForm />
    </>
  );
}

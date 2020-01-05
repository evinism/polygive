import React, { useState } from "react";
import Dropdown, { DropdownButton } from "../../components/Dropdown";
import DonationScheduleAmount from "./DonationScheduleAmount";
import {
  ShortCharityRecord,
  DonationScheduleRecord
} from "../../../../server/shared/polygiveApi";

interface DSLineItemProps {
  donationSchedule: DonationScheduleRecord;
  charity: ShortCharityRecord;
  //
  onEdit: (donationSchedule: DonationScheduleRecord) => Promise<unknown>;
  onDelete?: () => Promise<unknown>;
}

type DSLineItemState =
  | {
      editing: false;
    }
  | {
      editing: true;
      editStatus: "draft" | "submitting";
      donationSchedule: DonationScheduleRecord;
    };

const DSLineItem = ({ donationSchedule, charity, onEdit }: DSLineItemProps) => {
  const [state, setState] = useState<DSLineItemState>({ editing: false });
  const formattedDate = new Date(
    donationSchedule.nextScheduledDonation
  ).toLocaleDateString();
  const contents = !state.editing ? (
    <>
      <h4>{charity.name}</h4>
      <div>Next donation on: {formattedDate}</div>
      <DonationScheduleAmount
        amount={donationSchedule.amount}
        currency={donationSchedule.currency}
        recurrence={donationSchedule.recurrence}
      />
      <Dropdown
        contents={[
          <>
            <DropdownButton
              onClick={() => {
                setState({
                  editing: true,
                  editStatus: "draft",
                  donationSchedule: { ...donationSchedule }
                });
              }}
            >
              Edit
            </DropdownButton>
            <DropdownButton>Delete</DropdownButton>
          </>
        ]}
      >
        <div className="triple-dot" onClick={() => {}}>
          ⋮
        </div>
      </Dropdown>
    </>
  ) : (
    <>
      <h4>{charity.name}</h4>
      <form
        onSubmit={async event => {
          event.preventDefault();
          await onEdit(state.donationSchedule);
          setState({
            editing: false
          });
        }}
      >
        <input
          type="number"
          value={state.donationSchedule.amount}
          onChange={event => {
            setState({
              editing: true,
              editStatus: "draft",
              donationSchedule: {
                ...donationSchedule,
                amount: event.target.valueAsNumber
              }
            });
          }}
        />
        <input type="submit" />
        <input
          type="button"
          onClick={() => setState({ editing: false })}
          value="Cancel"
        />
      </form>
    </>
  );

  return (
    <div key={donationSchedule.id} className="donation-schedule">
      {contents}
    </div>
  );
};

export default DSLineItem;

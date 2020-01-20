import React, { useState, FormEvent } from "react";
import { createDonationSchedule } from "../api";
import { DonationRecurrence } from "../shared/polygiveApi";
import InputMoney from "./InputMoney";
import { Currency } from "../shared/money";

const recurrenceLabel: { [key in DonationRecurrence]: string } = {
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly"
};

type DonationsFormState =
  | {
      enabled: false;
    }
  | {
      enabled: true;
      charityId: number | undefined;
      amount: number | undefined;
      recurrence: DonationRecurrence;
    };

export default function DonationScheduleForm({
  charityId: parentCharityId
}: {
  charityId?: number;
}) {
  const [state, setState] = useState<DonationsFormState>({
    enabled: false
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      state.enabled &&
      state.charityId !== undefined &&
      state.amount !== undefined
    ) {
      createDonationSchedule(
        state.charityId,
        state.amount,
        state.recurrence
      ).then(() =>
        setState({
          enabled: false
        })
      );
    }
  };

  return state.enabled ? (
    <div>
      <form onSubmit={handleSubmit}>
        {!parentCharityId && (
          <label>
            Charity Id: <input name="charityId" type="text" />
          </label>
        )}
        <label>
          <InputMoney
            currency={Currency.USD}
            amount={state.amount}
            onChangeAmount={newAmount => {
              setState({
                ...state,
                amount: newAmount
              });
            }}
          />
        </label>
        <label>
          Recurrence:
          <select
            name="recurrence"
            onChange={event => {
              setState({
                ...state,
                recurrence: event.target.value
              });
            }}
          >
            {Object.entries(recurrenceLabel).map(entry => (
              <option value={entry[0]}>{entry[1]}</option>
            ))}
          </select>
        </label>
        <input type="submit" />
      </form>
      <button onClick={() => setState({ enabled: false })}>Close</button>
    </div>
  ) : (
    <button
      onClick={() =>
        setState({
          enabled: true,
          charityId: parentCharityId,
          amount: 0,
          recurrence: "monthly"
        })
      }
    >
      Start a Recurring Donation
    </button>
  );
}

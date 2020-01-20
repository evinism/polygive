import React, { useState, FormEvent, ChangeEvent } from "react";
import { createDonation } from "../api";
import InputMoney from "./InputMoney";
import { Currency } from "../shared/money";

interface DonationsFormProps {
  charityId?: number;
  currency?: Currency;
}

type DonationsFormState =
  | {
      enabled: false;
    }
  | {
      enabled: true;
      charityId: number | undefined;
      amount: number | undefined;
    };

export default function DonationsForm({
  charityId: parentCharityId,
  currency = Currency.USD // Big oof here
}: DonationsFormProps) {
  const [state, setState] = useState<DonationsFormState>({
    enabled: false
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.enabled && state.charityId && state.amount !== undefined) {
      createDonation(state.charityId, state.amount).then(() =>
        setState({ enabled: false })
      );
    } else {
      throw "Validation Error!";
    }
  };

  return state.enabled ? (
    <div>
      <form onSubmit={handleSubmit}>
        {!parentCharityId && (
          <label>
            Charity Id:
            <input
              name="charityId"
              type="text"
              value={state.charityId}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setState({
                  ...state,
                  charityId: event.target.valueAsNumber
                });
              }}
            />
          </label>
        )}
        <label>
          <InputMoney
            amount={state.amount}
            currency={currency}
            onChangeAmount={amount =>
              setState({
                ...state,
                amount: amount
              })
            }
          />
        </label>
        <input type="submit" />
      </form>
      <button onClick={() => setState({ enabled: false })}>Close</button>
    </div>
  ) : (
    <button
      onClick={() =>
        setState({ enabled: true, charityId: parentCharityId, amount: 0 })
      }
    >
      Create a Donation!
    </button>
  );
}

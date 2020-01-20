import React from "react";
import { InputNumber } from "antd";
import { Currency, getCurrencyDetails } from "../../shared/money";

interface InputMoneyProps {
  amount: number | undefined;
  currency: Currency;
  onChangeAmount: (arg: number | undefined) => unknown;
}

const DEFAULT_AMOUNT = 0;

const InputMoney = ({
  amount = DEFAULT_AMOUNT,
  currency,
  onChangeAmount
}: InputMoneyProps) => {
  // todo: Extract common logic here into human readable format function, and/or
  // use an external currency formatter.
  const currencyDetails = getCurrencyDetails(currency);
  const formatter = (value: string | number | undefined) => {
    const baseFormat = currencyDetails.postfix
      ? `${value} ${currencyDetails.symbol}`
      : `${currencyDetails.symbol} ${value}`;
    return baseFormat.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parser = (value: string | undefined) => {
    const regex = new RegExp(`\\${currencyDetails.symbol}\\s?|(,*)`, "g");
    return (value || "").replace(regex, "");
  };

  const handleChange = (value: number | undefined) => {
    if (value === undefined) {
      onChangeAmount(undefined);
    } else {
      onChangeAmount(value * currencyDetails.displayMultiplier);
    }
  };

  return (
    <InputNumber
      defaultValue={DEFAULT_AMOUNT}
      value={amount / currencyDetails.displayMultiplier}
      formatter={formatter}
      min={0}
      precision={Math.log10(currencyDetails.displayMultiplier)}
      parser={parser}
      onChange={handleChange}
    />
  );
};

export default InputMoney;

import { Currency } from "./shared/currency";

/* all of these are based in the smallest possible whole-number amounts
 * possible, e.g. USD is represented in cents. We assume all values are
 * below 2^53.
 */

const currencyDetails: {
  [key in Currency]: {
    symbol: string;
    humanReadable: string;
    postfix: boolean;
    displayMultiplier: number;
  };
} = {
  USD: {
    symbol: "$",
    humanReadable: "$ (US)",
    postfix: false,
    displayMultiplier: 100
  },
  EUR: {
    symbol: "€",
    humanReadable: "€",
    postfix: false,
    displayMultiplier: 100
  },
  JPY: {
    symbol: "¥",
    humanReadable: "¥",
    postfix: false,
    displayMultiplier: 1
  },
  GBP: {
    symbol: "£",
    humanReadable: "£",
    postfix: false,
    displayMultiplier: 100
  }
};

export const getCurrencyDetails = (currency: Currency) =>
  currencyDetails[currency];

export const formatMonetaryAmount = (amount: number, currency: Currency) => {
  const { postfix, displayMultiplier, symbol } = getCurrencyDetails(currency);
  const digits = Math.log10(displayMultiplier);
  const formattedAmount = (amount / displayMultiplier).toFixed(digits);
  if (!postfix) {
    return `${symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount} ${symbol}`;
  }
};

export enum Currency {
  USD = "USD", // in Cents
  EUR = "EUR", // Euro Cents
  JPY = "JPY", // Single yen
  GBP = "GBP" // pennny
}

export interface MonetaryAmount {
  amount: number; // Any non-integer should be treated as the FLOOR of the value.
  currency: Currency;
}

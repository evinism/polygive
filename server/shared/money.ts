
import {Currency} from './currency' ;

/* all of these are based in the smallest possible whole-number amounts 
 * possible, e.g. USD is represented in cents. We assume all values are
 * below 2^53. 
 */
export interface MonetaryAmount {
  amount: number, // Any non-integer should be treated as the FLOOR of the value.
  currency: Currency,
}

const currencySymbols: {[key in Currency]: string} = {
  USD: 'US$',
  EUR: '€',
  JPY: '¥',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'CHF',
  CNY: '元',
  HKD: 'HK$',
  //NZD: 'NZ$',
  //SEK: 'kr',
  //KRW: '₩',
  //SGD: 'S$',
  //NOK: 'kr',
  //MXN: '$',
  //INR: '₹',
  //RUB: '₽',
  //ZAR: 'R',
  //TRY: '₺',
  //BRL: 'R$',
  //TWD: 'NT$',
  //DKK: 'kr',
  //PLN: 'zł',
  //THB: '฿',
  //IDR: 'Rp',
};

export const getCurrencySymbol =
  (currency: Currency) => currencySymbols[currency];

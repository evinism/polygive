import React from "react";
import { Currency, getCurrencyDetails } from "../../shared/money";

const CreatePaymentConfigWidget = () => (
  <div>
    <h3>Payment Setup</h3>
    <form>
      <select>
        {Object.keys(Currency).map(currency => (
          <option value={currency}>
            {getCurrencyDetails(currency as Currency).humanReadable}
          </option>
        ))}
      </select>
    </form>
  </div>
);

export default CreatePaymentConfigWidget;

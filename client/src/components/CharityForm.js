import React, {useState} from 'react';
import {createCharity} from '../api';

export default function CharityForm() {
  const [enabled, setEnabled] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    createCharity(name).then(() => setEnabled(false));
  };

  return enabled ? (
    <div>
      <form onSubmit={handleSubmit}>
        {(
          <label>
            Charity Name: <input name="charityId" type="text" />
          </label>
        )}
        <input type="submit" />
      </form>
      <button onClick={() => setEnabled(false)}>Close</button>
    </div> 
  ) : (
    <button onClick={() => setEnabled(true)}>
      Create a charity!
    </button>
  );
}
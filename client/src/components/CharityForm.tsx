import React, {useState, FormEvent} from 'react';
import {createCharity} from '../api';

export default function CharityForm() {
  const [enabled, setEnabled] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: figure how the hell to put this into typescript
    const name = (event.target as any).name.value as string;
    createCharity(name).then(() => setEnabled(false));
  };

  return enabled ? (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Charity Name: <input name="name" type="text" />
        </label>
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
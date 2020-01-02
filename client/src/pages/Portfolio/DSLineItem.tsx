import React, { useState } from 'react';
import Dropdown, { DropdownButton } from '../../components/Dropdown';
import DonationScheduleAmount from './DonationScheduleAmount';
import { ShortCharityRecord, DonationScheduleRecord } from '../../../../server/shared/polygiveApi';


interface DSLineItemProps {
  donationSchedule: DonationScheduleRecord;
  charity: ShortCharityRecord;
  // 
  onEdit: (donationSchedule: DonationScheduleRecord) => Promise<unknown>;
  onDelete?: () => Promise<unknown>;
};

type DSLineItemState = {
  editing: false,
} | {
  editing: true,
  editStatus: 'draft' | 'submitting',
  donationSchedule: DonationScheduleRecord,
};

const DSLineItem = ({donationSchedule, charity, onEdit}: DSLineItemProps) => {
  const [state, setState] = useState<DSLineItemState>({ editing: false });

  const contents = !state.editing
    ? (<>
      <DonationScheduleAmount 
        amount={parseFloat(donationSchedule.amount)}
        recurrence={donationSchedule.recurrence} />
      <Dropdown contents={[
        <>
          <DropdownButton onClick={() => {
            setState({
              editing: true,
              editStatus: 'draft',
              donationSchedule: { ...donationSchedule }
            });
          }}>Edit</DropdownButton>
          <DropdownButton>Delete</DropdownButton>
        </>]
      }>
        <div className='triple-dot' onClick={() => {}}>⋮</div>
      </Dropdown>
    </>)
    : (<>
      <form onSubmit={
        async (event) => {
          event.preventDefault();
          await onEdit(state.donationSchedule);
          setState({
            editing: false
          });
        }
      }>
        <input
          type="number" 
          value={state.donationSchedule.amount}
          onChange={(event) => {
            setState({
              editing: true,
              editStatus: 'draft',
              donationSchedule: {
                ...donationSchedule,
                amount: event.target.value,
              },
            });
          }} />
        <input type="submit" />
        <input type="button" value="Cancel" />
      </form>
    </>)

  return (
    <div key={donationSchedule.id} className="donation-schedule">
      <h4>{charity.name}</h4>
      {contents}
    </div>
  );
};

export default DSLineItem;

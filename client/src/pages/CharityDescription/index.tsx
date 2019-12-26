import React, {useState, useEffect} from 'react';
import { PageProps, LoggedInAppState } from '../../clientTypes';
import { getCharity } from '../../api';
import { ShortCharityRecord } from '../../../../server/shared/polygiveApi';

type State = ShortCharityRecord | undefined;

export default function CharityDescription(props: PageProps<LoggedInAppState>){
  const charityId = props.match.params.id as string; // oof on this 
  const [charity, setCharity] = useState<State>(undefined);
  useEffect(() => {
    getCharity(charityId).then(data => setCharity(data));
  }, []);
  const contents = charity ? (
    <>
      <h2>{charity.name}</h2>
      <div className="charity-description">
      </div>
    </>
  ) : '';
  return (
    <div>
      {contents}
    </div>
  );
}

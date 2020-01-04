import React, { useState, useEffect } from "react";
import { PageProps, LoggedInAppState } from "../../clientTypes";
import { getCharity } from "../../api";
import { ShortCharityRecord } from "../../../../server/shared/polygiveApi";
import { WaitForLoaded } from "../../components/UIElements";

type State = ShortCharityRecord | undefined;

export default function CharityDescription(props: PageProps<LoggedInAppState>) {
  const charityId = parseInt(props.match.params.id as string, 10); // oof on this
  const [charity, setCharity] = useState<State>(undefined);
  useEffect(() => {
    getCharity(charityId).then(data => setCharity(data));
  }, []);
  const contents = (
    <WaitForLoaded item={charity}>
      {charity => (
        <>
          <h2>{charity.name}</h2>
          <div className="charity-description"></div>
        </>
      )}
    </WaitForLoaded>
  );
  return <div>{contents}</div>;
}

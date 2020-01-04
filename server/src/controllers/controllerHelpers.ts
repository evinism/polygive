import Charity from "../entity/Charity";

interface HasCharity {
  charityId: number;
  charity: Charity;
}

export function grabAllCharities<T extends HasCharity>(record: T[]) {
  return record.reduce((acc, cur) => {
    acc[cur.charityId] = cur.charity;
    return acc;
  }, {} as { [key: string]: Charity });
}

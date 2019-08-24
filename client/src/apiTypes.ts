export type UserResponse = {
  id: string,
  loggedIn: boolean,
  isSuper: boolean,
  name: string,
};

export type CharityResponse = {
  id: string,
  title: string,
}[];

export type DonationsResponse = {
  id: string,
  charityId: string,
  amount: string,
}[];

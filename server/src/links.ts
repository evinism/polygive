/* 
A set of helpers that map ids to links for that id. 
Not typesafe w.r.t. the API type safety.
*/
import { FRONTEND_URL } from './config/env';

export const charityLink = (charityId: number) => (
  `${FRONTEND_URL}/charities/${charityId}`
);

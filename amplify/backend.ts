import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * The backend definition ties together every resource (auth, data, storage,
 * functions). `npx ampx sandbox` reads this file and provisions it all to AWS.
 * @see https://docs.amplify.aws/react/build-a-backend/
 */
defineBackend({
  auth,
  data,
});

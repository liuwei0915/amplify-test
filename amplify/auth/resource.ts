import { defineAuth } from '@aws-amplify/backend';

/**
 * Cognito auth resource. Email login is enabled, which is required for the
 * owner-based authorization rules used in the data schema.
 * @see https://docs.amplify.aws/react/build-a-backend/auth/
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});

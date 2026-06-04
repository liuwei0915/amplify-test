import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * DATA SCHEMA
 * Each `a.model` becomes a DynamoDB table plus AppSync GraphQL operations
 * (create/read/update/delete/list/subscribe), all fully typed for the client.
 *
 * The Todo model below matches the UI in src/App.jsx.
 */
const schema = a.schema({
  Todo: a
    .model({
      content: a.string().required(),
      done: a.boolean().default(false),
    })
    // For easy local testing we allow any visitor with the API key to do CRUD.
    // (Switch to allow.owner() once you add sign-in for per-user data.)
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // API key lets you test immediately without signing in.
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

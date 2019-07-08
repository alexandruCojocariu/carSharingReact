import { load } from 'graphql-load';

import { Accounts } from 'meteor/accounts-base';
import { initAccounts } from 'meteor/cultofcoders:apollo-accounts';

import './db';
import './entities';
// import './fixtures';
import './users.expose';
import './main';

const AccountsModule = initAccounts({
  loginWithFacebook: false,
  loginWithGoogle: false,
  loginWithLinkedIn: false,
  loginWithPassword: true,

  CreateUserProfileInput: `
    firstName: String
    lastName: String
  `

  // overrideCreateUser: async (createUser, _, args, context) => {
  //   const { email, profile } = args;
  //   console.log('aici');
  //   const response = await createUser(
  //     _,
  //     Object.assign(args, { createdAt: new Date(), updatedAt: new Date() }),
  //     context
  //   );

  //   return response;
  // }
});

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: false
});

load(AccountsModule);

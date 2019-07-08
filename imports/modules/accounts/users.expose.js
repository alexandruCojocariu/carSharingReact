import { expose, db } from 'meteor/cultofcoders:apollo';

expose({
  users: {
    type: 'User',
    collection: () => db.users,

    update: (ctx, { selector, modifier, modifiedFields, modifiedTopLevelFields }) => {
      return true;
    },
    insert: (ctx, { document }) => {
      return true;
    },
    remove: (ctx, { selector }) => {
      return true;
    },
    find(ctx, params) {}
  }
});

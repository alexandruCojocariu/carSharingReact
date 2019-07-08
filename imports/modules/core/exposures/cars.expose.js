import { expose, db } from 'meteor/cultofcoders:apollo';

expose({
  cars: {
    type: 'Car',
    collection: () => db.cars,

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

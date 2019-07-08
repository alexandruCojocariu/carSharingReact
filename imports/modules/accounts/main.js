import { load } from 'graphql-load';

load({
  typeDefs: `
    type Query {
      me: User
    }
  `,
  resolvers: {
    Query: {
      me(_, args, { db, userId }) {
        return db.users.findOne(userId, {
          fields: {
            profile: 1,
            emails: 1,
            username: 1,
            roles: 1
          }
        });
      }
    }
  }
});

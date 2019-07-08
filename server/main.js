// import { Meteor } from 'meteor/meteor';
// import Links from '/imports/api/links';

// function insertLink(title, url) {
//   Links.insert({ title, url, createdAt: new Date() });
// }

// Meteor.startup(() => {
//   // If the Links collection is empty, add some data.
//   if (Links.find().count() === 0) {
//     insertLink(
//       'Do the Tutorial',
//       'https://www.meteor.com/tutorials/react/creating-an-app'
//     );

//     insertLink(
//       'Follow the Guide',
//       'http://guide.meteor.com'
//     );

//     insertLink(
//       'Read the Docs',
//       'https://docs.meteor.com'
//     );

//     insertLink(
//       'Discussions',
//       'https://forums.meteor.com'
//     );
//   }
// });

import '../imports/modules';
// import './apollo';

import { initialize } from 'meteor/cultofcoders:apollo';
import { load } from 'graphql-load';

load({
  typeDefs: `
    type Query {
      sayHello: String
    }
  `,
  resolvers: {
    Query: {
      sayHello: () => 'Hello world!'
    }
  }
});

initialize();

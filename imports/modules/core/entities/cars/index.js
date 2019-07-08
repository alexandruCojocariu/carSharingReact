import { load } from 'graphql-load';

import resolvers from './resolvers';
import typeDefs from './types';

load({
  typeDefs,
  resolvers
});

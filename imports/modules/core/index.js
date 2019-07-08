import './entities';
import './db';
import './exposures';
import { load } from 'graphql-load';
import typeDefs from './types';

import { CarService } from './services';

load({
  typeDefs,
  resolvers: {
    Query: {
      async findCarsInRadius(
        _,
        {
          input: { coordinates, radius }
        }
      ) {
        return await CarService.findCarsInRadius(coordinates[0], coordinates[1], radius);
      }
    },
    Mutation: {
      async addCar(_, { input }, { userId }) {
        return await CarService.addCar(input, userId);
      },
      async reserveCar(_, { input }, { userId }) {
        return await CarService.reserve(input, userId);
      }
    }
  }
});

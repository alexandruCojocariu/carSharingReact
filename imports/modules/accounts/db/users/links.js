import Users from './collection';
import { Cars } from '../../../core/db';

Users.addLinks({
  // ownedCars: {
  //   collection: Cars,
  //   type: 'many',
  //   field: 'ownedCarsIds'
  // },
  borrowedCars: {
    collection: Cars,
    type: 'many',
    field: 'borrowedCarsIds'
  }
});

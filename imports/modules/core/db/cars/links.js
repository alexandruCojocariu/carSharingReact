import Cars from './collection';
import { Users } from '../../../accounts/db';

Cars.addLinks({
  // owner: {
  //   collection: Users,
  //   inversedBy: 'ownedCars'
  // },
  borrower: {
    collection: Users,
    inversedBy: 'borrowedCars'
  }
});

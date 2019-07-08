import { db } from 'meteor/cultofcoders:apollo';

global.window = {
  screen: {
    devicePixelRatio: 1
  }
};
global.document = {
  documentElement: {
    style: {}
  },
  getElementsByTagName: function() {
    return [];
  },
  createElement: function() {
    return {};
  }
};
global.navigator = {
  userAgent: 'nodejs',
  platform: 'nodejs'
};
global.L = require('leaflet');

export default class CarService {
  async addCar(input, _id) {
    const carId = db.cars.insert(input);
    if (db.users.update({ _id }, { $push: { ownedCarsIds: carId } })) return true;
    return false;
  }
  async findCarsInRadius(lat, lng, radius) {
    const center = L.latLng(lat, lng);
    const cars = db.cars.find().fetch();
    return cars.filter(
      car => center.distanceTo(L.latLng(car.coordinates[0], car.coordinates[1])) <= radius * 1000
    );
  }

  async reserve({ carId, reservationStartDate, reservationEndDate }, userId) {
    // console.log(this.userId);
    if (
      db.cars.update(
        { _id: carId },
        {
          $set: {
            reservationStartDate,
            reservationEndDate,
            reserved: true,
            reservedById: userId
          }
        }
      )
    )
      return {
        success: true
      };
    // return {
    //   success: db.cars.update({_id}, {
    //     $set: {

    //   }
    // }
    //   )
    // }
  }
}

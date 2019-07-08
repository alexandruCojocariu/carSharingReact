import db from 'apollo-morpher';

export const findBorrowedCars = function(_id) {
  return db.cars.find(
    {
      _id: 1,
      name: 1,
      type: 1,
      description: 1,
      fueled: 1,
      reserved: 1,
      reservedById: 1,
      reservationStartDate: 1,
      reservationEndDate: 1,
      coordinates: 1
    },
    {
      filters: {
        reservedById: _id
      }
    }
  );
};

export const findOwnedCars = function(_id) {
  return db.users.findOne(
    {
      _id: 1,
      ownedCarsIds: 1,
      ownedCars: {
        _id: 1,
        name: 1,
        type: 1,
        description: 1,
        fueled: 1,
        reserved: 1,
        reservedById: 1,
        reservationStartDate: 1,
        reservationEndDate: 1,
        coordinates: 1
      }
    },
    {
      filters: {
        _id
      }
    }
  );
};

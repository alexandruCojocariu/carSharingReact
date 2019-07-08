import db from 'apollo-morpher';

export const findById = function(_id) {
  return db.cars.findOne(
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
        _id
      }
    }
  );
};

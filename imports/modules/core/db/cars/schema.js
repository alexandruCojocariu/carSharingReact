import SimpleSchema from 'simpl-schema';
import Cars from './collection';

const CarsSchema = new SimpleSchema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  fueled: {
    type: Boolean
  },
  reserved: {
    type: Boolean,
    optional: true
  },
  reservedById: {
    type: String,
    optional: true
  },
  reservationStartDate: {
    type: Date,
    optional: true
  },
  reservationEndDate: {
    type: Date,
    optional: true
  },
  description: {
    type: String
  },
  coordinates: {
    type: Array
  },
  'coordinates.$': {
    type: Number
  },
  // ownerId: String,
  createdAt: {
    type: Date,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  }
});

Cars.attachSchema(CarsSchema);

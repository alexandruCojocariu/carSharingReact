import SimpleSchema from 'simpl-schema';
import RolesEnum from './enums/RolesEnum';
import _ from 'lodash';
import Users from './collection';

const ProfileSchema = new SimpleSchema({
  firstName: String,
  lastName: String
});

const UserSchema = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    optional: true
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  ownedCarsIds: {
    type: Array,
    optional: true
  },
  'ownedCarsIds.$': String,
  borrowedCarsIds: {
    type: Array,
    optional: true
  },
  'borrowedCarsIds.$': String,
  roles: {
    type: Array,
    optional: true
  },
  'roles.$': {
    type: String,
    allowedValues: _.values(RolesEnum)
  },
  profile: ProfileSchema
  // createdAt: Date,
  // updatedAt: Date
});

Users.attachSchema(UserSchema);

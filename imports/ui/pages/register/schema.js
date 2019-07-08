import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String }
});

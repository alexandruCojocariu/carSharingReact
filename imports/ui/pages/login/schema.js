import SimpleSchema from 'simpl-schema';

export const LoginSchema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: { type: String }
});

import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  fueled: {
    type: Boolean,
    defaultValue: false
  },
  description: {
    type: String
  },
  location: { type: String }
});

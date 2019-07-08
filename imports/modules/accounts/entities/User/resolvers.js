export default {
  User: {
    email: user => user.emails[0].address
  }
};

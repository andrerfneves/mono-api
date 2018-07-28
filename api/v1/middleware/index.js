/* eslint-disable global-require */

module.exports = {
  error: require('./error-middleware'),
  format: require('./format-middleware'),
  auth: require('./auth-middleware'),
  cors: require('./cors-middleware'),
};

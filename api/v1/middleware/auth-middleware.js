const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../../../config');

module.exports = async (req, res, next) => {
  const token = req.headers['x-mono-token'];

  if (!token) {
    return res.status(400).error(new Error('No token provided'), 'No token provided');
  }

  let payload;
  try {
    payload = jwt.verify(token, config.jwt.secret);
  } catch (error) {
    return res.status(401).error(error, 'Failed to authenticate token');
  }

  let user;
  try {
    user = await User.findOne({ _id: payload.id }).exec();
  } catch (error) {
    return res.status(500).error(error);
  }

  if (!user) {
    return res.status(401).error(new Error('User not found'), 'Failed to find user identified in token');
  }

  delete payload.exp;
  delete payload.iat;
  const newToken = jwt.sign(
    payload,
    config.jwt.secret,
    config.jwt.options,
  );

  req.user = user;
  req.token = newToken;

  return next();
};

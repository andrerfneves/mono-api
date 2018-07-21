const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../../../config');

module.exports = {
  signUp: async (req, res) => {
    const {
      name,
      email,
      password,
    } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const userParams = {
      name,
      email,
      password: hash,
    };

    let user;
    try {
      user = await User.create(userParams);
    } catch (error) {
      return res.status(500).error(error, 'Error creating user');
    }

    const token = jwt.sign(
      { id: user._id },
      config.jwt.secret,
      config.jwt.options,
    );

    req.token = token;
    return res.status(201).format(user, 'Successfully created user');
  },

  logIn: async (req, res) => {
    const {
      email,
      password,
    } = req.body;

    let user;
    try {
      user = await User.findOne({ email }).exec();
    } catch (error) {
      return res.status(500).error(error, 'Error logging in user');
    }

    if (!user || (user && !user.checkPassword(password))) {
      return res.status(401).error(new Error('Invalid email/password'), 'Invalid email/password');
    }

    const token = jwt.sign(
      { id: user._id },
      config.jwt.secret,
      config.jwt.options,
    );

    req.token = token;
    return res.status(200).format(user, 'Successfully logged in user');
  },
};

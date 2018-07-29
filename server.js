/* eslint-disable no-console */

require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { red, green } = require('chalk');
const config = require('./config');
const api = require('./api');

mongoose.connect(config.db.url, { useNewUrlParser: true });

const app = express();
app.use(morgan(config.env.log.level));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api());

const start = async () => {
  try {
    await app.listen(config.env.port);
    console.log(green(`Server listening on port ${config.env.port}`));
  } catch (error) {
    console.error(red('Error starting server: '), error);
  }
};

start();

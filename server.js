/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const config = require('./config');
const setupRoutes = require('./app/routes');
const middleware = require('./app/middleware');
const mongoose = require('mongoose');

mongoose.connect(config.db.url);


const app = express();

dotenv.config();

app.use(morgan(config.env.log.level));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.error);
app.use(middleware.format);

setupRoutes(app);

app.listen(config.env.port, (err) => {
  if (err) {
    console.error('Error starting server: ', err);
  } else {
    console.log(`Server listening on port ${config.env.port}`);
  }
});

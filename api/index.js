const { Router } = require('express');
const { routes: v1Routes } = require('./v1');

module.exports = () => {
  const router = Router();
  router.use('/v1', v1Routes());
  return router;
};

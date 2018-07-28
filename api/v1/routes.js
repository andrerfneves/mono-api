const { Router } = require('express');
const controllers = require('./controllers');
const {
  auth,
  error,
  format,
  cors,
} = require('./middleware');

module.exports = () => {
  const router = Router();

  router.use(error);
  router.use(format);
  router.use(cors);

  router.get('/', controllers.home.index);

  router.post('/signup', controllers.user.signUp);
  router.post('/login', controllers.user.logIn);

  router.get('/me', auth, controllers.me.read);

  return router;
};

const controllers = require('../app/controllers');
const middleware = require('../app/middleware');

module.exports = (app) => {
  app.get('/', controllers.home.index);

  app.post('/signup', controllers.user.signUp);
  app.post('/login', controllers.user.logIn);

  app.get('/me', middleware.auth, controllers.me.read);
};

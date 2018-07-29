module.exports = {
  env: {
    port: process.env.PORT || 8080,
    log: {
      level: process.env.LOG_LEVEL || 'dev',
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'WhoWouldYouBlame',
    options: {
      expiresIn: process.env.JWT_EXPIRE_TIME || '24h',
    },
  },
  db: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/mono_server',
  },
};

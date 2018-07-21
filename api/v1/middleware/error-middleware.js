module.exports = (req, res, next) => {
  res.error = (error, message) => res.send({
    message,
    error,
  });
  next();
};

module.exports = (req, res, next) => {
  res.format = (data, message) => res.send({
    message,
    data,
    token: req.token,
  });
  next();
};

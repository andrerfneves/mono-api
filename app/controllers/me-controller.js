module.exports = {
  read: (req, res) => res.status(200).format(req.user, 'Successfuly retrieved logged in user'),
};

const { findUserByUsername } = require('./dbController');
const getUser = (req, res) => {
  const user = findUserByUsername(req.params.username);
  res.status(200).json({
    user,
  });
};
module.exports = { getUser };

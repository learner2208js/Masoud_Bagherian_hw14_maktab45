const { findUserByUsername, updateUser } = require('./dbController');
const checkLoginAutherization = (req, res, next) => {
  const username = req.params.username;
  const user = findUserByUsername(username);
  if (!user.isLoggedIn) {
    return res.redirect('/');
  }
  next();
};
const sendUserProfile = (req, res) => {
  res.render('profile');
};
const isUserAuthorized = (req, res, next) => {
  const { loggedInUsername: username } = req.body;
  const user = findUserByUsername(username);
  if (user.isLoggedIn === false) {
    return res.status(404).json({
      editAuthorized: false,
    });
  }
  next();
};
const respondUserEditation = (req, res) => {
  console.log(req.body);
  const {
    loggedInUsername: oldUsername,
    username: newUsername,
    password: newPassword,
    email,
    gender,
  } = req.body;
  const user = findUserByUsername(oldUsername);
  let isPasswordChanged = false;
  if (user.password !== newPassword) {
    isPasswordChanged = true;
  }
  updateUser(oldUsername, {
    username: newUsername,
    password: newPassword,
    email,
    gender,
    isLoggedIn: isPasswordChanged ? false : true,
  });
  res.status(200).json({
    valid: true,
    data: req.body,
    isPasswordChanged,
  });
};
module.exports = {
  sendUserProfile,
  checkLoginAutherization,
  isUserAuthorized,
  respondUserEditation,
};

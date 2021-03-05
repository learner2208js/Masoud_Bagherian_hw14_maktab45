const fs = require('fs');
const path = require('path');
const { searchUser, updateUser } = require('./dbController');
const logoutUser = (req, res, next) => {
  updateUser(req.params.username, { isLoggedIn: false });

  next();
};
const redirectHomePage = (req, res) => {
  res.redirect('/');
};
const sendLoginPage = (req, res) => {
  res.render('login');
};
const checkUserAvailability = (req, res, next) => {
  const { username, password } = req.body;
  const user = searchUser(username, password);
  if (!user) {
    return res.status(404).json({
      available: false,
      message: 'کاربری با این مشخصات وجود ندارد',
    });
  }
  next();
};
const respondLogin = (req, res) => {
  const { username } = req.body;
  updateUser(username, { isLoggedIn: true });
  res.status(200).json({
    available: true,
    message: 'ورود موفقیت امیز',
  });
};
module.exports = {
  sendLoginPage,
  checkUserAvailability,
  respondLogin,
  logoutUser,
  redirectHomePage,
};

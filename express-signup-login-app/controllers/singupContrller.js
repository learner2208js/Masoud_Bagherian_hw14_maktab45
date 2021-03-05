const {
  validateUsername,
  validatePassword,
  validateEmail,
} = require('./validation/validate');
const { addUser } = require('./dbController');
const sendSignupPage = (req, res) => {
  res.render('signup');
};
const validateSignup = (req, res, next) => {
  const { loggedInUsername, username, password, email, gender } = req.body;
  const formItemsStatus = [];
  formItemsStatus.push(
    validateUsername(username, req.baseUrl, loggedInUsername)
  );
  formItemsStatus.push(validatePassword(password));
  formItemsStatus.push(validateEmail(email));
  // console.log(formItemsStatus);
  const invalideItems = formItemsStatus.filter(
    (item) => item.validity === false
  );
  if (invalideItems.length) {
    // there is at least one invalid item
    const messages = invalideItems.map((item) => item.message);
    return res.status(404).json({
      valid: false,
      logs: messages,
    });
  }
  next();
};
const respondSignup = (req, res) => {
  // const { username, password, email, gender } = req.body;
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    gender: req.body.gender,
  };
  addUser(user);
  res.status(200).json({
    valid: true,
    data: req.body,
  });
};
module.exports = { sendSignupPage, validateSignup, respondSignup };

const validator = require('validator');
const fs = require('fs');
const path = require('path');
const { fstat } = require('fs');
const validateUsername = (username, page, pageUsername) => {
  if (username === '') {
    return {
      validity: false,
      message: 'نام کاربری الزامی است',
    };
  }
  if (username.length < 8) {
    return {
      validity: false,
      message: 'نام کاربری باید حداقل شامل هشت حرف باشد',
    };
  }
  if (isUsernameAvailable(username)) {
    if (
      page === '/sign-up' ||
      (page === '/profile' && username !== pageUsername)
    ) {
      return {
        validity: false,
        message: 'این نام کاربری قبلا ثبت شده است',
      };
    }
  }
  return {
    validity: true,
  };
};
const validatePassword = (password) => {
  if (password === '') {
    return {
      validity: false,
      message: 'رمز عبور الزامی است',
    };
  }
  if (
    password.length < 8 ||
    !password.split('').some((letter) => isNaN(letter)) ||
    !password.split('').some((letter) => !isNaN(letter))
  ) {
    return {
      validity: false,
      message:
        'رمز عبور باید شامل حداقل هشت کاراکتر و یک حرف الفبا و یک رقم باشد',
    };
  }
  return {
    validity: true,
  };
};
const validateEmail = (email) => {
  if (email === '') {
    return {
      validity: false,
      message: 'ایمیل الزامی است',
    };
  }
  if (!validator.isEmail(email)) {
    return {
      validity: false,
      message: 'ایمیل معتبر نیست',
    };
  }
  return {
    validity: true,
  };
};
function isUsernameAvailable(username) {
  let isUsername = false;
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, './../../users.json'))
  );
  const user = users.find((item) => item.username === username);
  if (user) {
    return true;
  }
  return false;
}

module.exports = { validateUsername, validatePassword, validateEmail };

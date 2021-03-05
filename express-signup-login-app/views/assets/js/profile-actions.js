function getUser() {
  const urlArray = window.location.href.split('/');
  const user = urlArray[urlArray.length - 1];
  return user;
}
const user = getUser();
ajax(
  {
    method: 'get',
    url: `/api/v1/users/${user}`,
  },
  (response) => {
    const resBody = JSON.parse(response);
    const user = resBody.user;
    fillProfile(user);
  }
);
function fillProfile(user) {
  fillProfileInfo(user);
  fillProfileEdit(user);
}
function fillProfileInfo(user) {
  const { username, password, email, gender } = user;
  const {
    username: usernameTag,
    password: passwordTag,
    email: emailTag,
    gender: genderTag,
  } = profile.info;
  usernameTag.textContent = username;
  passwordTag.textContent = password;
  emailTag.textContent = email;
  genderTag.textContent = gender === 'male' ? 'مرد' : 'زن';
}
function fillProfileEdit(user) {
  const { username, password, email, gender } = user;
  const {
    username: usernameField,
    password: passwordField,
    email: emailField,
    male,
    female,
  } = profile.edit;
  usernameField.value = username;
  passwordField.value = password;
  emailField.value = email;
  gender === 'male' ? (male.checked = true) : (female.checked = true);
}
function exitProfile() {
  window.location.href = `/login/${user}`;
}
function submitForm(e) {
  e.preventDefault();
}


profile.edit.form.addEventListener('submit', submitForm);
profile.info.exitBtn.addEventListener('click', exitProfile);
profile.edit.exitBtn.addEventListener('click', exitProfile);

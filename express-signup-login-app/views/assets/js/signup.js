const form = document.getElementById('signup-form');
const toast = document.getElementById('toast');
const alerts = {
  container: document.getElementById('alerts-wrapper'),
  list: document.getElementById('alerts-list'),
};
const signup = {
  username: document.getElementById('username'),
  password: document.getElementById('password'),
  email: document.getElementById('email'),
  genderMale: document.getElementById('male'),
  genderFemale: document.getElementById('female'),
};
function submitForm(e) {
  e.preventDefault();
  const { username, password, email, genderMale } = signup;
  const data = {
    username: username.value.trim(),
    password: password.value.trim(),
    email: email.value.trim(),
    gender: genderMale.checked ? 'male' : 'female',
  };
  ajax({ method: 'post', url: '/sign-up/check-user', data }, (response) => {
    const resBody = JSON.parse(response);
    if (resBody.valid === false) {
      slideUp(alerts.container, { marginBottom: '0' });
      fillAlertsBox(resBody.logs);
      setTimeout(() => {
        slideDown(alerts.container, { marginBottom: '20px' });
      }, 500);
      return;
    }
    if (resBody.valid) {
      slideUp(alerts.container, { marginBottom: '0' });
      document.getElementById('signup-btn').disabled = true;
      setTimeout(() => {
        slideDown(toast, { marginBottom: '20px' });
        toast.classList.add('fill');
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }, 300);
    }
  });
}
function fillAlertsBox(logs) {
  alerts.list.innerHTML = '';
  logs.forEach((log) => {
    alerts.list.innerHTML += `<li class="alerts__item">${log}</li>`;
  });
}

form.addEventListener('submit', submitForm);

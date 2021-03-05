const toast = document.getElementById('toast');
const alerts = {
  container: document.getElementById('alerts-wrapper'),
  list: document.getElementById('alerts-list'),
};
function editUser() {
  const { username, password, email, male } = profile.edit;
  const data = {
    loggedInUsername: getUser(),
    username: username.value.trim(),
    password: password.value.trim(),
    email: email.value.trim(),
    gender: male.checked ? 'male' : 'female',
  };
  ajax({ method: 'post', url: '/profile/check-user', data }, (response) => {
    const resBody = JSON.parse(response);
    if (resBody.editAuthorized === false) {
      window.location.href = '/';
      return;
    }
    if (resBody.valid === false) {
      slideUp(alerts.container, { marginBottom: '0' });
      fillAlertsBox(resBody.logs);
      setTimeout(() => {
        slideDown(alerts.container, { marginBottom: '20px' });
      }, 500);
      return;
    }
    if (resBody.valid) {
      const { isPasswordChanged } = resBody;
      slideUp(alerts.container, { marginBottom: '0' });
      deactivateLinks();
      setTimeout(() => {
        slideDown(toast, { marginBottom: '20px' });
        toast.classList.add('fill');
        setTimeout(() => {
          slideUp(toast, { marginBottom: '0' });
          toast.classList.remove('fill');
          activateLinks();
          if (isPasswordChanged) {
            // password changes
            window.location.href = '/';
            return;
          }
          window.location.href = `/profile/${resBody.data.username}`;
          // password doesn't change
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
profile.edit.changeBtn.addEventListener('click', editUser);
function deactivateLinks() {
  const links = document.querySelectorAll('[data-link=true]');
  links.forEach((link) => (link.style.pointerEvents = 'none'));
}
function activateLinks() {
  const links = document.querySelectorAll('[data-link=true]');
  links.forEach((link) => (link.style.pointerEvents = 'auto'));
}

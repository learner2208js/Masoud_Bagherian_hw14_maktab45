const form = {
  container: document.getElementById('login-form'),
  username: document.getElementById('username'),
  password: document.getElementById('password'),
};
const toast = {
  container: document.getElementById('toast'),
  textBox: document.getElementById('toast-body'),
  line: document.getElementById('toast-line'),
};
function loginUser(e) {
  e.preventDefault();
  const { username, password } = form;
  if (username.value.trim() === '' || password.value.trim() === '') {
    return;
  }
  const data = {
    username: username.value.trim(),
    password: password.value.trim(),
  };
  ajax({ method: 'post', url: '/login/check-user', data }, (response) => {
    const { available, message } = JSON.parse(response);
    disableLinks();
    showToast(message, available, data.username);
  });
}
function showToast(message, status, username) {
  if (status) {
    toast.container.classList.add('success');
  }

  toast.textBox.textContent = message;
  toast.container.classList.add('fill');
  slideDown(toast.container, { marginBottom: '20px' });
  setTimeout(() => {
    activateLinks();
    if (!status) {
      slideUp(toast.container, { marginBottom: '0' });
      toast.container.classList.remove('fill');
      return;
    }
    window.location.href = `/profile/${username}`;
  }, 2000);
}
function disableLinks() {
  const links = document.querySelectorAll('[data-link=true]');
  links.forEach((link) => (link.style.pointerEvents = 'none'));
}
function activateLinks() {
  const links = document.querySelectorAll('[data-link=true]');
  links.forEach((link) => (link.style.pointerEvents = 'auto'));
}
form.container.addEventListener('submit', loginUser);

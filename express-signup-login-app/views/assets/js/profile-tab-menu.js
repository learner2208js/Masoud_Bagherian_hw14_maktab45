const profile = {
  container: document.getElementById('profile'),
  tabs: document.querySelectorAll('.profile .menu__item'),
  sections: document.querySelectorAll('.profile__section'),
  info: {
    username: document.getElementById('username-info'),
    password: document.getElementById('password-info'),
    email: document.getElementById('email-info'),
    gender: document.getElementById('gender-info'),
    exitBtn: document.getElementById('info-btn-exit'),
  },
  edit: {
    form: document.getElementById('edit-form'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    email: document.getElementById('email'),
    male: document.getElementById('male'),
    female: document.getElementById('female'),
    changeBtn: document.getElementById('edit-btn-change'),
    exitBtn: document.getElementById('edit-btn-exit'),
  },
};

function switchContent(e) {
  const tab = e.target;
  if (!tab.classList.contains('menu__item')) {
    return;
  }
  const index = prevAll(tab);
  activeTab(tab);
  acitveSection(index);
}
function prevAll(el) {
  const parent = el.parentElement;
  let children = parent.children;
  children = Array.prototype.slice.call(children);
  let nth;
  children.forEach((child, index) => {
    if (child === el) {
      nth = index;
    }
  });
  return nth;
}
function activeTab(tab) {
  deactiveAllTabs();
  tab.classList.add('active');
}
function deactiveAllTabs() {
  profile.tabs.forEach((tab) => {
    tab.classList.remove('active');
  });
}
function acitveSection(sectionIndex) {
  deactiveAllSections();
  profile.sections.forEach((section, index) => {
    if (index === sectionIndex) {
      section.classList.add('active');
    }
  });
}
function deactiveAllSections() {
  profile.sections.forEach((section) => {
    section.classList.remove('active');
  });
}
profile.container.addEventListener('click', switchContent);

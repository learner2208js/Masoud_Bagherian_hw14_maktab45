const fs = require('fs');
const path = require('path');
const readAllUsers = () => {
  let users;
  try {
    users = JSON.parse(
      fs.readFileSync(path.join(__dirname, './../users.json'), 'utf-8')
    );
  } catch (error) {
    console.log('error occured while reading database ...');
    users = [];
  }
  return users;
};
const writeUsers = (users) => {
  fs.writeFileSync(
    path.join(__dirname, './../users.json'),
    JSON.stringify(users)
  );
};
const addUser = (user) => {
  const users = readAllUsers();
  users.push({ ...user, isLoggedIn: false });
  fs.writeFile(
    path.join(__dirname, './../users.json'),
    JSON.stringify(users),
    (err) => {
      console.log('error occured while adding user to database');
    }
  );
};
const searchUser = (username, password) => {
  const users = readAllUsers();
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  return user;
};

const findUserByUsername = (username) => {
  const users = readAllUsers();
  const user = users.find((item) => item.username === username);
  return user;
};
const updateUser = (username, obj) => {
  const users = readAllUsers();
  const user = findUserByUsername(username);

  const index = users.findIndex((item) => item.username === user.username);
  for (const prop in obj) {
    users[index][prop] = obj[prop];
  }
  writeUsers(users);
};
module.exports = { addUser, searchUser, updateUser, findUserByUsername };

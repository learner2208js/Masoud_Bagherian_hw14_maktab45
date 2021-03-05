const server = require('./index');
const port = 8000;
server.listen(port, () => {
  console.log(`App running on port ${port}`);
});

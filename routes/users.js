const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

fsPromises.readFile(path.join(__dirname, `${path.sep}..${path.sep}data${path.sep}users.json`), { encoding: 'utf8' })
  .then((users) => {
    router.get('/users', (req, res) => {
      res.send(users);
    });

    router.get('/users/:id', (req, res) => {
      const userData = JSON.parse(users).find((user) => user._id === req.params.id);
      if (userData) {
        res.send(userData);
      } else {
        res.status(404);
        res.send({ message: 'Нет пользователя с таким id' });
      }
    });
  })
  .catch((err) => {
    router.get('*', (req, res) => {
      console.log(err);
      res.status(400);
      res.send({ message: 'Error reading data' });
    });
  });

module.exports = router;

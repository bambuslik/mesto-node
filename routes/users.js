const usersRoutes = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

usersRoutes.get('/', (req, res) => {
  fsPromises.readFile(path.join(__dirname, '../data/users.json'), { encoding: 'utf8' })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send({ message: 'Error reading data' });
    });
});

usersRoutes.get('/:id', (req, res) => {
  fsPromises.readFile(path.join(__dirname, '../data/users.json'), { encoding: 'utf8' })
    .then((users) => {
      const userData = JSON.parse(users).find((user) => user._id === req.params.id);
      if (userData) {
        res.send(userData);
      } else {
        res.status(404);
        res.send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send({ message: 'Error reading data' });
    });
});

module.exports = usersRoutes;

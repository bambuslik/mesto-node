const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

fsPromises.readFile(path.join(__dirname, `${path.sep}..${path.sep}data${path.sep}cards.json`), { encoding: 'utf8' })
  .then((cards) => {
    router.get('/cards', (req, res) => {
      res.send(cards);
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

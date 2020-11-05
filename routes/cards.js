const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

router.get('/', (req, res) => {
  fsPromises.readFile(path.join(__dirname, '../data/cards.json'), { encoding: 'utf8' })
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.send({ message: 'Error reading data' });
    });
});

module.exports = router;

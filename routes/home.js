const express = require('express');
const router = express.Router();
const top = require('../top.json');

router.get('/', (req, res) => {
  res.send(top);
});

module.exports = router;

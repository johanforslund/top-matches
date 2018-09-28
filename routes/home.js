const express = require('express');
const router = express.Router();
const Matchday = require('../models/matchday');

router.get('/', async (req, res) => {
  const matchday = await Matchday.findOne();

  res.send(matchday);
});

module.exports = router;

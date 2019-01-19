const express = require('express');
const router = express.Router();
const Match = require('../models/match');

router.get('/', async (req, res) => {
  const match = await Match.findOne();

  res.send(match);
});

module.exports = router;

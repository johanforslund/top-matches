const axios = require('axios');
const fs = require('fs');
const mongoose = require('mongoose');
const Match = require('../models/match');
const keys = require('../config/keys');

const config = {
  headers: {
    'X-Auth-Token': keys.apiToken,
    Accept: 'application/json'
  }
};

function fetchAndSave() {
  axios.get('http://api.football-data.org/v2/matches?dateFrom=2019-01-19&dateTo=2019-01-21&competitions=2021', config)
    .then(res => {
      output = res.data;
      
      fs.writeFile('top.json', JSON.stringify(output, null, 2), 'utf8', (err) => {
        if (err) throw err;
        console.log('API response has been saved.');
      });

      Match.insertMany(output.matches);
    });
}

module.exports = fetchAndSave;

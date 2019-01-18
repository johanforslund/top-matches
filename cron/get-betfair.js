const axios = require('axios');
const fs = require('fs');
const mongoose = require('mongoose');
const Matchday = require('../models/matchday');
const keys = require('../config/keys');

const header = {
  headers: {
    'X-Application': keys.betfairAppKey,
    'X-Authentication': keys.betfairSessionToken,
    Accept: 'application/json'
  }
};

const body = {
    filter: {
    	eventTypeIds: [1],
    	marketTypeCodes: ['MATCH_ODDS'],
    	marketStartTime: {
    		from: '2019-01-20T00:00:00Z',
    		to: '2019-01-20T23:59:00Z'
    	}
    },
    maxResults: 5,
    marketProjection: ['EVENT'],
    sort: 'MAXIMUM_TRADED'
};

function fetchAndSave() {
  axios.post('https://api.betfair.com/exchange/betting/rest/v1.0/listMarketCatalogue/', body, header)
    .then(res => {
      const output = {
        matches: res.data
      };

      fs.writeFile('top.json', JSON.stringify(output, null, 2), 'utf8', (err) => {
        if (err) throw err;
        console.log('API response has been saved.');
      });

      const matchday = new Matchday(output);
      matchday.save();
    });
}

module.exports = fetchAndSave;

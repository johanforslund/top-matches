const axios = require('axios');
const fs = require('fs');
const config = require('config');
const mongoose = require('mongoose');
const Matchday = require('../models/matchday');

const header = {
  headers: {
    'X-Application': config.get('betfair.appKey'),
    'X-Authentication': config.get('betfair.sessionToken'),
    Accept: 'application/json'
  }
};

const body = {
    filter: {
    	eventTypeIds: [1],
    	marketTypeCodes: ['MATCH_ODDS'],
    	marketStartTime: {
    		from: '2018-09-28T00:00:00Z',
    		to: '2018-09-28T23:59:00Z'
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

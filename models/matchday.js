const mongoose = require('mongoose');

const Matchday = mongoose.model('Matchdays', new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  matches: [{
    type: new mongoose.Schema({
      marketId: String,
      marketName: String,
      totalMatched: Number,
      event: {
        type: new mongoose.Schema({
          id: String,
          name: String,
          countryCode: String,
          timezone: String,
          openDate: Date
        })
      }
    })
  }]
}));

module.exports = Matchday;

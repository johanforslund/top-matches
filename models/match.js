const mongoose = require('mongoose');

const Match = mongoose.model('Match', new mongoose.Schema({
  id: Number,
  competition: {
    type: new mongoose.Schema({
      id: Number,
      name: String
    })
  },
  season: {
    type: new mongoose.Schema({
      id: Number,
      startDate: Date,
      endDate: Date,
      currentMatchday: String,
      winner: String
    })
  },
  utcDate: Date,
  status: String,
  matchday: Number,
  stage: String,
  group: String,
  lastUpdated: Date,
  score: {
    type: new mongoose.Schema({
      winner: String,
      duration: String,
      fullTime: {
        type: new mongoose.Schema({
          homeTeam: Number,
          awayTeam: Number
        })
      },
      halfTime: {
        type: new mongoose.Schema({
          homeTeam: Number,
          awayTeam: Number
        })
      },
      extraTime: {
        type: new mongoose.Schema({
          homeTeam: String,
          awayTeam: String
        })
      },
      penalties: {
        type: new mongoose.Schema({
          homeTeam: String,
          awayTeam: String
        })
      }
    })
  },
  homeTeam: {
    type: new mongoose.Schema({
      id: Number,
      name: String
    })
  },
  awayTeam: {
    type: new mongoose.Schema({
      id: Number,
      name: String
    })
  },
  referees: [{
    type: new mongoose.Schema({
      id: Number,
      name: String
    })
  }]
}));

module.exports = Match;

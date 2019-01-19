const express = require('express');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const app = express();
const home = require('./routes/home');
const fetchAndSave = require('./cron/get-data');
const keys = require('./config/keys');

//Run cron job every midnight
schedule.scheduleJob('0 0 0 * * *', function(){
  fetchAndSave();
});

fetchAndSave();


mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/', home);

app.listen(3000, () => console.log('Listening on port 3000...'));

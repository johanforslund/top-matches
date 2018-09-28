const express = require('express');
const mongoose = require('mongoose');
const app = express();
const home = require('./routes/home');

mongoose.connect('mongodb://localhost/top-games', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/', home);

app.listen(3000, () => console.log('Listening on port 3000...'));

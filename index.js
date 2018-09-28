const express = require('express');
const app = express();
const home = require('./routes/home');

app.use(express.json());
app.use('/', home);

app.listen(3000, () => console.log('Listening on port 3000...'));

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json({
  limit: '100mb',
  type: 'application/json'
}));
app.use(express.urlencoded({
  extended: true,
  parameterLimit: 80000
}));
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true
}));

app.use(require('cookie-parser')());

app.use('/api/v1/art-works', require('./controllers/artWorks'));
app.use('/api/v1/series', require('./controllers/series'));
app.use('/api/v1/auth', require('./controllers/auth'));
app.use('/api/v1/email', require('./controllers/email'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

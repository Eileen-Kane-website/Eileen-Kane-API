const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(require('cookie-parser')());

app.use('/api/v1/art-works', require('./controllers/artWorks'));
app.use('/api/v1/series', require('./controllers/series'));
app.use('/api/v1/auth', require('./controllers/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

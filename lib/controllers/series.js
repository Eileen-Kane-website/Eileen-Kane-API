const { Router } = require('express');
const logging = require('../utils/logging');
const Series = require('../models/Series');

const NAMESPACE = 'series controller';

module.exports = Router()
  .get('/', (req, res, next) => {
    logging.info(NAMESPACE, 'GET series called');
    Series.getAllSeries()
      .then(series => res.send(series))
      .catch(next);
  });

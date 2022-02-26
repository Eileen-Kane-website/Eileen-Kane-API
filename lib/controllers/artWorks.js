const { Router } = require('express');
const logging = require('../utils/logging');
const ArtWork = require('../models/ArtWork');

const NAMESPACE = 'artWorks controller';

module.exports = Router()
  .get('/', (req, res, next) => {
    logging.info(NAMESPACE, 'GET artWorks called');
    ArtWork.getAllWorks()
      .then(works => res.send(works))
      .catch(next);
  });

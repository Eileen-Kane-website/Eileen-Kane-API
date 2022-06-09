const { Router } = require('express');
const logging = require('../utils/logging');
const Series = require('../models/Series');
const deleteJpg = require('../middleware/jpg-delete');
const ArtWorkService = require('../services/artWork-service');

const NAMESPACE = 'series controller';

module.exports = Router()
  .get('/', (req, res, next) => {
    logging.info(NAMESPACE, 'GET series called');
    Series.getAllSeries()
      .then(series => res.send(series))
      .catch(next);
  })

  .post('/', (req, res) => {
    logging.info(NAMESPACE, 'POST series called');
    Series.insert(req.body.series)
      .then(series => res.send(series))
      .catch(err => res.status(500).json(err));
  })

  .post('/update', (req, res) => {
    logging.info(NAMESPACE, 'POST update series called');
    Series.updateSeries(req.body.series)
      .then(series => res.send(series))
      .catch(err => res.status(500).json(err));
  })

  .delete('/', deleteJpg, (req, res) => {
    logging.info(NAMESPACE, 'DELETE series called');
    ArtWorkService.deleteArtWorks(req.body.images)
      .then(images => {
        Series.deleteSeries(req.body.series.id)
          .then(series => res.send({
            series,
            images
          }));
      });
  });

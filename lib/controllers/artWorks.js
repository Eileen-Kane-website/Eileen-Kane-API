const { Router } = require('express');
const logging = require('../utils/logging');
const imageUpload = require('../middleware/image-upload');
const deleteJpg = require('../middleware/jpg-delete');
const ArtWork = require('../models/ArtWork');
const ArtWorkService = require('../services/artWork-service');

const NAMESPACE = 'artWorks controller';

module.exports = Router()
  .get('/', (req, res, next) => {
    logging.info(NAMESPACE, 'GET artWorks called');

    ArtWork.getAllWorks()
      .then(works => res.send(works))
      .catch(next);
  })

  .put('/featured', (req, res, next) => {
    logging.info(NAMESPACE, 'PUT featured called');

    const updatedFeatured = ArtWorkService.updateFeatured(req.body.featureUpdateImages);
    res.send({
      updatedFeatured
    })
      .catch(next);
  })

  .post('/', imageUpload, (req, res) => {
    logging.info(NAMESPACE, 'POST images called');

    const imageData = req.body.imageData;
    ArtWork.insert(imageData)
      .then(val => res.send(val))
      .catch(err => console.log(err));
  })

  .delete('/', deleteJpg,  (req, res) => {
    logging.info(NAMESPACE, 'DELETE image called');

    ArtWorkService.deleteArtWorks(req.body.images)
      .then(deletedImages => res.send(deletedImages))
      .catch(err => console.log(err));
  });

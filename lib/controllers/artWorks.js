const { Router } = require('express');
const logging = require('../utils/logging');
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
    // const unFeatured = ArtWorkService.unFeature(req.body.unFeaturedImages);
    console.log('featured ==> ', req.body.featureUpdateImages, '==> ', updatedFeatured);
    // console.log('unfeatured ==> ', req.body.unFeaturedImages, '==> ', unFeatured);
    res.send({
      updatedFeatured
    });
    next;
  });

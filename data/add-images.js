const ArtWork = require('../lib/models/ArtWork');
const images = require('./images');


Promise.all(
  images.map(image => {
    console.log('Inserting => ', image.title);
    return ArtWork.insert(image);
  })
);

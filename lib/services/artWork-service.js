const ArtWork = require('../models/ArtWork');

const updateFeatured = async(updateItems) => {
  return await Promise.all(
    updateItems.map(item => ArtWork.updateIsFeatured(item.isFeatured, item.id))
  );
};

const deleteArtWorks = async(images) => {
  return await Promise.all(
    images.map(image => (
      ArtWork.deleteWork(Number(image.id))
    ))
  );
};

module.exports = {
  updateFeatured,
  deleteArtWorks
};

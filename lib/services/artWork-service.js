const ArtWork = require('../models/ArtWork');

const updateFeatured = async(updateItems) => {
  console.log('addFeatured => ', updateItems);
  return await Promise.all(
    updateItems.map(item => ArtWork.updateIsFeatured(item.isFeatured, item.id))
  );
};

module.exports = {
  updateFeatured
};

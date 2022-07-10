const { cloudinary } = require('../utils/cloudinary-config');

module.exports = (req, res, next) => {
  const { image } = req.body.data;
  const oldPublicId = image.old_slug;
  const newPublicId = image.slug;

  if(oldPublicId !== newPublicId) {
    cloudinary.uploader.rename(
      `eileen-kane/${oldPublicId}`, 
      `eileen-kane/${newPublicId}`, 
      (error, result) => {
        req.cloudResponse = { error, result };
        next();
      });
  } else {
    next();
  }
};

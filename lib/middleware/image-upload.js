const { cloudinary } = require('../utils/cloudinary-config');

module.exports = (req, res, next) => {
  const imageString = req.body.imageBlob;
  cloudinary.uploader.upload(imageString, {
    public_id: req.body.imageData.slug,
    unique_filename: false,
    upload_preset: 'eileen-kane'
  })
    .then(res => {
      req.cloudImage = res;
      next();
    })
    .catch(err => next(err));
};

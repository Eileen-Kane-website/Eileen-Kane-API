const { cloudinary } = require('../utils/cloudinary-config');

module.exports = (req, res, next) => {
  const publicIds = req.body.images.map(item => (
    `eileen-kane/${item.slug}`
  ));

  if (publicIds.length) {
    cloudinary.api.delete_resources(publicIds, (error, result) => {
      console.log('jpeg-delete => ', error, result);
      req.cloudResponse = { error, result };
      next();  
    });
  } else {
    next();
  }
};

const fs = require('fs');
const cloudinary = require('cloudinary');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

const uploadToCludinary = async (file, path, next) =>
  new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return next(new AppError('Upload image failed', 400));
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });

exports.uploadImages = catchAsync(async (req, res, next) => {
  const { path } = req.body;
  const files = Object.values(req.files).flat();
  const images = [];

  await Promise.all(
    files.map(async (file) => {
      const url = await uploadToCludinary(file, path, next);
      images.push(url);
      removeTmp(file.tempFilePath);
    })
  );

  res.status(200).json({
    status: 'success',
    images,
  });
});
exports.listImages = catchAsync(async (req, res, next) => {
  const { path, sort, max } = req.body;
  /**
   * "sort":"desc",
   * "max":"20",
   * "path":"username/folder name or * to get all images"
   */

  cloudinary.v2.search
    .expression(`${path}`)
    .sort_by('created_at', `${sort}`)
    .max_results(max)
    .execute()
    .then((resulte) => res.json(resulte))
    .catch((err) => next(new AppError(err.error.message, 500)));
});

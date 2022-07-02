const fs = require('fs');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = catchAsync(async (req, res, next) => {
  if (!req.files || Object.values(req.files).flat().length === 0) {
    return next(new AppError('No file selected.', 400));
  }

  const files = Object.values(req.files).flat();
  files.forEach((file) => {
    if (!file.mimetype.startsWith('image')) {
      removeTmp(file.tempFilePath);
      return next(new AppError('Unsupported format.', 400));
    }
    if (file.size > 1024 * 1024 * 2) {
      return next(new AppError('File size is too large.', 400));
    }
  });

  next();
});

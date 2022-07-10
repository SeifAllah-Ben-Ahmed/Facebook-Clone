const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.authUser = catchAsync(async (req, res, next) => {
  const tmp = req.header('Authorization');
  const token = tmp && tmp.split(' ')[1];

  if (!token) {
    return next(
      new AppError('You are not authorized, Please login to get access', 400)
    );
  }
  const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  req.user = { id };

  next();
});

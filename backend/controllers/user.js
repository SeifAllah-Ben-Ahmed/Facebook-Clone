const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const validation = require('../utils/validation');
const AppError = require('../utils/AppError');
const { generateToken } = require('../utils/token');
const { sendVerificationEmail } = require('../utils/mailer');

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, gender, bMonth, bDay, bYear } =
    req.body;

  if (!validation.validateEmail(email)) {
    return next(new AppError('Invalid email address', 400));
  }
  const username = await validation.validateUsername(firstName, lastName, User);

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
    gender,
    bMonth,
    bDay,
    bYear,
  });

  const verificationToken = generateToken(user._id);
  const url = `${process.env.BASE_URL}/activate/${verificationToken}`;

  sendVerificationEmail(user.email, user.firstName, url);

  const token = generateToken(user._id);

  res.status(201).json({
    status: 'success',
    message: 'Register Success! Please activate your email to start.',
    user: {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
      picture: user.picture,
    },
    token,
  });
});
exports.activateAccount = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(id);

  if (user.verified) {
    return next(new AppError('This account is already activated', 400));
  }
  user.verified = true;
  user.save();
  res.status(200).json({
    status: 'success',
    message: 'account has been activated successfully.',
    user: {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
      picture: user.picture,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const correct = user && (await user.correctPassword(password, user.password));

  if (!correct || !user) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = generateToken(user._id);
  res.status(200).json({
    status: 'success',
    user: {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
      picture: user.picture,
    },
    token,
  });
});

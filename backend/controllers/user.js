const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const validation = require('../utils/validation');
const AppError = require('../utils/AppError');
const { generateToken } = require('../utils/token');
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require('../utils/mailer');
const Code = require('../models/code');
const generateCode = require('../utils/generateCode');
const Post = require('../models/post');

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

  const verificationToken = generateToken(user._id, '30m');
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

  const validUser = req.user.id;
  const user = await User.findById(id);
  if (validUser !== id) {
    return next(
      new AppError('You are not authorized to complet this operation!', 400)
    );
  }
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

exports.sendVerification = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (user.verified) {
    return next(new AppError('This account is already activated', 400));
  }

  const verificationToken = generateToken(user._id, '30m');
  const url = `${process.env.BASE_URL}/activate/${verificationToken}`;

  sendVerificationEmail(user.email, user.firstName, url);

  res.status(200).json({
    status: 'success',
    message: 'Email verification link has been send via email',
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select('-password');
  if (!user) {
    return next(new AppError('Account does not exist.', 400));
  }
  res.status(200).json({
    email: user.email,
    picture: user.picture,
  });
});

exports.sendResetPasswordCode = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select('-password');
  await Code.findOneAndRemove({ user: user._id });
  const code = generateCode(5);
  await Code.create({
    code,
    user: user._id,
  });
  sendResetPasswordEmail(email, user.firstName, code);
  res.status(200).json({
    message: 'Reset password code has been send to your email',
    email: user.email,
    picture: user.picture,
  });
});

exports.validateResetCode = catchAsync(async (req, res, next) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email }).select('-password');
  const codeDB = await Code.findOne({ user: user._id });

  if (code !== codeDB.code) {
    return next(new AppError('Verification code is wrong.', 400));
  }

  res.status(204).json({ status: 'success' });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  user.password = password;
  user.save();

  res
    .status(200)
    .json({ status: 'success', message: 'Password been updated successfully' });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const me = await User.findById(req.user.id);
  const user = await User.findOne({ username }).select('-password');

  if (!user) {
    return next(new AppError('User not found.', 404));
  }
  const friendship = {
    friends: false,
    following: false,
    requestSent: false,
    requestReceived: false,
  };
  if (me._id !== user._id) {
    if (me.friends.includes(user._id) && user.friends.includes(me._id)) {
      friendship.friends = true;
    }
    if (me.following.includes(user._id)) {
      friendship.following = true;
    }
    if (me.requests.includes(user._id)) {
      friendship.requestReceived = true;
    }
    if (user.requests.includes(me._id)) {
      friendship.requestSent = true;
    }
  }
  await user.populate('friends', 'firstName lastName username picture');
  const posts = await Post.find({ user: user._id })
    .populate('user')
    .sort({ createdAt: -1 });

  res.status(200).json({ status: 'success', user, posts, friendship });
});

exports.updateProfilePicture = catchAsync(async (req, res, next) => {
  const { url } = req.body;
  await User.findByIdAndUpdate(req.user.id, { picture: url });

  res.status(200).json({ status: 'success', url });
});

exports.updateCover = catchAsync(async (req, res, next) => {
  const { url } = req.body;
  await User.findByIdAndUpdate(req.user.id, { cover: url });

  res.status(200).json({ status: 'success', url });
});

exports.updateDetails = catchAsync(async (req, res, next) => {
  const { infos } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { details: infos },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ status: 'success', details: user.details });
});

exports.addFriend = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  if (user.id === id) {
    return next(new AppError('You cant send a request', 400));
  }
  const sender = await User.findById(user.id);
  const receiver = await User.findById(id);

  if (
    receiver.requests.includes(sender._id) ||
    receiver.friends.includes(sender._id)
  ) {
    return next(new AppError('Request allready sent', 400));
  }

  await receiver.updateOne({ $push: { requests: sender._id } });
  await receiver.updateOne({ $push: { followers: sender._id } });
  await sender.updateOne({ $push: { following: receiver._id } });

  res
    .status(200)
    .json({ status: 'success', message: 'Freind request has been sent' });
});

exports.cancelRequest = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  if (user.id === id) {
    return next(new AppError('You cant cancel a request', 400));
  }
  const sender = await User.findById(user.id);
  const receiver = await User.findById(id);
  if (!receiver.requests.includes(sender._id)) {
    return next(new AppError('Request allready sent', 400));
  }
  await receiver.updateOne({ $pull: { requests: sender._id } });
  await receiver.updateOne({ $pull: { followers: sender._id } });
  await sender.updateOne({ $pull: { following: receiver._id } });

  res.status(200).json({
    status: 'success',
    message: 'Freind request canceled successfully',
  });
});

exports.follow = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  if (user.id === id) {
    return next(new AppError('You cant cancel a request', 400));
  }
  const sender = await User.findById(user.id);
  const receiver = await User.findById(id);
  if (
    receiver.followers.includes(sender._id) ||
    sender.following.includes(receiver._id)
  ) {
    return next(new AppError('Request allready sent', 400));
  }
  await receiver.updateOne({ $push: { followers: sender._id } });

  await sender.updateOne({ $push: { following: receiver._id } });

  res.status(200).json({
    status: 'success',
    message: 'Freind follow successfully',
  });
});

exports.unfollow = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  if (user.id === id) {
    return next(new AppError('You cant cancel a request', 400));
  }
  const sender = await User.findById(user.id);
  const receiver = await User.findById(id);
  if (
    !receiver.followers.includes(sender._id) ||
    !sender.following.includes(receiver._id)
  ) {
    return next(new AppError('Request allready sent', 400));
  }
  await receiver.updateOne({ $pull: { followers: sender._id } });
  await sender.updateOne({ $pull: { following: receiver._id } });

  res.status(200).json({
    status: 'success',
    message: 'Freind request canceled successfully',
  });
});

exports.acceptRequest = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  if (user.id === id) {
    return next(new AppError('You cant cancel a request', 400));
  }
  const receiver = await User.findById(user.id);
  const sender = await User.findById(id);
  if (!receiver.requests.includes(sender._id)) {
    return next(new AppError('Request allready sent', 400));
  }

  await receiver.updateOne({
    $push: { friends: sender._id, following: sender._id },
  });
  await sender.updateOne({
    $push: { friends: receiver._id, followers: receiver._id },
  });

  await receiver.updateOne({ $pull: { requests: sender._id } });

  res.status(200).json({
    status: 'success',
    message: 'Freind request accepted successfully',
  });
});

exports.unfriend = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  if (user.id === id) {
    return next(new AppError('You cant cancel a request', 400));
  }
  const sender = await User.findById(user.id);
  const receiver = await User.findById(id);
  if (
    !receiver.friends.includes(sender._id) ||
    !sender.friends.includes(receiver._id)
  ) {
    return next(new AppError('Request allready sent', 400));
  }

  await receiver.updateOne({
    $pull: {
      friends: sender._id,
      following: sender._id,
      followers: sender._id,
    },
  });
  await sender.updateOne({
    $pull: {
      friends: receiver._id,
      following: receiver._id,
      followers: receiver._id,
    },
  });

  await receiver.updateOne({ $pull: { requests: sender._id } });

  res.status(200).json({
    status: 'success',
    message: 'Unfreind request successfully',
  });
});

exports.deleteRequest = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  if (user.id === id) {
    return next(new AppError('You cant cancel a request', 400));
  }
  const receiver = await User.findById(user.id);
  const sender = await User.findById(id);
  if (!receiver.requests.includes(sender._id)) {
    return next(new AppError('Request allready sent', 400));
  }

  await receiver.updateOne({
    $pull: { requests: sender._id, followers: sender._id },
  });
  await sender.updateOne({
    $pull: { following: receiver._id },
  });

  res.status(200).json({
    status: 'success',
    message: 'Cancel request successfully',
  });
});

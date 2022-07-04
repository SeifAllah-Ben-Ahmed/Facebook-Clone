const Post = require('../models/post');
const catchAsync = require('../utils/catchAsync');

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(201).json({
    status: 'success',
    post,
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find()
    .populate('user', 'firstName lastName username picture gender')
    .sort({ createdAt: -1 });
  res.status(200).json({
    status: 'success',
    posts,
  });
});

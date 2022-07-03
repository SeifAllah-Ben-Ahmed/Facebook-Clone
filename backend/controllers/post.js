const Post = require('../models/post');
const catchAsync = require('../utils/catchAsync');

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(201).json({
    status: 'success',
    post,
  });
});

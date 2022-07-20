const Post = require('../models/post');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);
  await post.populate('user', 'firstName lastName username picture cover');
  res.status(201).json({
    status: 'success',
    post,
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const followings = await User.findById(req.user.id).select('following');
  const { following } = followings;
  const followingsPosts = (
    await Promise.all(
      following.map((user) =>
        Post.find({ user })
          .populate('user', 'firstName lastName username picture')
          .populate('comments.commentBy', 'firstName lastName username picture')
          .sort({ createdAt: -1 })
          .limit(10)
      )
    )
  ).flat();
  const userPost = await Post.find({ user: req.user.id })
    .populate('user', 'firstName lastName username picture cover')
    .populate('comments.commentBy', 'firstName lastName username picture')
    .sort({ createdAt: -1 })
    .limit(10);

  const posts = [...followingsPosts, ...userPost].sort(
    (a, b) => b.createdAt - a.createdAt
  );
  res.status(200).json({
    status: 'success',
    posts,
  });
});

exports.comment = catchAsync(async (req, res, next) => {
  const { comment, image, postId } = req.body;

  const { id } = req.user;
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: { comment, image, commentBy: id, commentAt: new Date() },
      },
    },
    { new: true }
  ).populate('comments.commentBy', 'picture firstName lastName username');

  res.status(200).json({
    status: 'success',
    post,
  });
});

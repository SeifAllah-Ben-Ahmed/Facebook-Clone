const mongoose = require('mongoose');
const React = require('../models/react');
const catchAsync = require('../utils/catchAsync');

exports.reactPost = catchAsync(async (req, res, next) => {
  const { postId, react } = req.body;
  const check = await React.findOne({
    postRef: postId,
    reactBy: mongoose.Types.ObjectId(req.user.id),
  });
  if (!check) {
    await React.create({
      react,
      reactBy: req.user.id,
      postRef: postId,
    });
  } else if (check.react === react) {
    await React.findByIdAndRemove(check._id);
  } else {
    await React.findByIdAndUpdate(check._id, { react });
  }
  res.status(200).json({ status: 'success' });
});

exports.getReact = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const reacts = await React.find({ postRef: id });
  const newReact = reacts.reduce((prev, react) => {
    const key = react.react;
    prev[key] = prev[key] || [];
    prev[key].push(react);
    return prev;
  }, {});
  const arr = [
    {
      react: 'like',
      count: newReact.like ? newReact.like.length : 0,
    },
    {
      react: 'love',
      count: newReact.love ? newReact.love.length : 0,
    },
    {
      react: 'haha',
      count: newReact.haha ? newReact.haha.length : 0,
    },
    {
      react: 'sad',
      count: newReact.sad ? newReact.sad.length : 0,
    },
    {
      react: 'wow',
      count: newReact.wow ? newReact.wow.length : 0,
    },
    {
      react: 'angry',
      count: newReact.angry ? newReact.angry.length : 0,
    },
  ];
  // const check = await React.findOne({ postRef: id, reactBy: req.user.id });
  const checks = reacts.find(
    (react) => react.reactBy.toString() === req.user.id
  )?.react;
  res.status(200).json({
    status: 'success',
    reacts: arr,
    check: checks,
    total: reacts.length,
  });
});

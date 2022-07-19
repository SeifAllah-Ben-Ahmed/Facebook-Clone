const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const reactSchema = new mongoose.Schema({
  react: {
    type: String,
    required: true,
    enum: ['like', 'love', 'haha', 'sad', 'angry', 'wow'],
  },
  postRef: {
    type: ObjectId,
    ref: 'Post',
    required: true,
  },
  reactBy: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});
const React = mongoose.model('React', reactSchema);
module.exports = React;

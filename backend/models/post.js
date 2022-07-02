const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    postType: {
      type: String,
      enum: ['prfilePicture', 'cover', null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    background: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        images: {
          type: String,
        },
        commentBy: {
          type: ObjectId,
          ref: 'User',
          required: true,
        },
        commentAt: {
          type: Date,

          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;

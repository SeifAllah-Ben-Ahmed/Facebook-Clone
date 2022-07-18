const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required!'],
      trim: true,
      maxlength: [30, 'First name must have less or equal then 30 characters'],
      minlength: [3, 'First name must have more or equal then 3 characters'],
      text: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required!'],
      maxlength: [30, 'Last name must have less or equal then 30 characters'],
      minlength: [3, 'Last name must have more or equal then 3 characters'],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, 'User name is required!'],
      unique: [true, 'User name should be unique'],
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: [true, 'Email should be unique'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
    picture: {
      type: String,
      trim: true,
      default: '/images/default_pic.png',
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required!'],
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },

    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    requests: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    search: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: {
          values: ['Single', 'In a relationship', 'Married', 'Divorced', ''],
          message:
            'Relationship is either : Single, In a relationship, Married,  Divorced',
        },
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: mongoose.Schema.ObjectId,
          ref: 'Post',
        },
        savedAt: {
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  postedPassword,
  userPassword
) {
  return await bcrypt.compare(postedPassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

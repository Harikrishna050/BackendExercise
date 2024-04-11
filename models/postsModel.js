const mongoose = require('mongoose')

const postsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    content: {
      type: String,
      required: [true, 'Please add a content'],
    },
    categoryId: {
      type: Number,
      required: [true, 'Please add a categoryId'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('posts', postsSchema)
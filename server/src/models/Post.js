const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['技術', '生活', '美食', '攝影', '居家', '影評', '寵物', '健康']
  },
  author: {
    type: String,
    default: 'Admin'
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // 自動添加 createdAt 和 updatedAt
});

module.exports = mongoose.model('Post', postSchema); 
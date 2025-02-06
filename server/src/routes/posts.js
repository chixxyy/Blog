const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// 獲取所有文章
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};
    
    // 分類過濾
    if (category) {
      query.category = category;
    }
    
    // 搜尋功能
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    // 排序
    let sortOption = {};
    switch (sort) {
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'title':
        sortOption = { title: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const posts = await Post.find(query).sort(sortOption);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 獲取單篇文章
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: '文章不存在' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 創建文章
router.post('/', async (req, res) => {
  try {
    const post = new Post(req.body);
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 更新文章
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: '文章不存在' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 刪除文章
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: '文章不存在' });
    }
    res.json({ message: '文章已刪除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
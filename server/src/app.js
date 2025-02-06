const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');
require('dotenv').config();

const app = express();

// 連接數據庫
connectDB();

// 中間件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/posts', postsRouter);

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: '服務器錯誤',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ 服務器運行在端口 ${PORT}`);
}); 

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

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`服務器運行在端口 ${PORT}`);
}); 

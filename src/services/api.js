import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// 添加請求攔截器
api.interceptors.request.use(config => {
  console.log('發送請求:', config.url, config.params || config.data);
  return config;
});

// 添加響應攔截器
api.interceptors.response.use(
  response => {
    console.log('收到響應:', response.data);
    return response;
  },
  error => {
    console.error('請求錯誤:', error.response?.data || error.message);
    throw error;
  }
);

export const getPosts = async (params = {}) => {
  try {
    const response = await api.get('/posts', { params });
    return response.data;
  } catch (error) {
    console.error('獲取文章失敗:', error);
    throw error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('獲取文章詳情失敗:', error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error('創建文章失敗:', error);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('更新文章失敗:', error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    console.error('刪除文章失敗:', error);
    throw error;
  }
}; 
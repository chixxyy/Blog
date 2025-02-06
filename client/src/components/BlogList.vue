<template>
  <div class="space-y-6">
    <div v-if="loading" class="text-center">
      <p class="text-gray-600 dark:text-gray-400">載入中...</p>
    </div>
    
    <div v-else-if="error" class="text-center">
      <p class="text-red-600">{{ error }}</p>
    </div>
    
    <div v-else-if="posts.length === 0" class="text-center">
      <p class="text-gray-600 dark:text-gray-400">沒有找到相關文章</p>
    </div>
    
    <div v-else class="space-y-6">
      <article v-for="post in posts" :key="post._id" class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex justify-between items-start">
          <h2 class="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
            {{ post.title }}
          </h2>
          <div class="flex gap-2">
            <button
              @click="handleEdit(post)"
              class="p-2 text-blue-500 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              編輯
            </button>
            <button
              @click="handleDelete(post._id)"
              class="p-2 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900"
            >
              刪除
            </button>
          </div>
        </div>
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{{ new Date(post.createdAt).toLocaleDateString() }}</span>
          <span class="mx-2">·</span>
          <span>{{ post.category }}</span>
          <span class="mx-2">·</span>
          <span>瀏覽: {{ post.views }}</span>
        </div>
        <p class="text-gray-600 dark:text-gray-300">{{ post.content }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getPosts, deletePost } from '../services/api';

const props = defineProps({
  selectedCategory: String,
  searchQuery: String,
  sortBy: String
});

const posts = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchPosts = async () => {
  loading.value = true;
  error.value = null;
  try {
    posts.value = await getPosts({
      category: props.selectedCategory,
      search: props.searchQuery,
      sort: props.sortBy
    });
  } catch (err) {
    error.value = '獲取文章失敗';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPosts);

watch([
  () => props.selectedCategory,
  () => props.searchQuery,
  () => props.sortBy
], fetchPosts);

const handleDelete = async (id) => {
  if (!confirm('確定要刪除這篇文章嗎？')) return;
  
  try {
    await deletePost(id);
    // 重新獲取文章列表
    await fetchPosts();
  } catch (error) {
    console.error(error);
  }
};

const handleEdit = (post) => {
  emit('edit', post);
};
</script> 
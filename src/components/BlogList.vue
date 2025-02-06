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

    <Transition name="fade">
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed right-6 bottom-6 z-50 p-3 text-white bg-blue-500 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        title="回到頂部"
      >
        <svg 
          class="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { getPosts, deletePost } from '../services/api'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  },
  selectedCategory: String,
  searchQuery: String,
  sortBy: String
})

const emit = defineEmits(['edit', 'refresh'])

const loading = ref(false)
const error = ref(null)

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.pageYOffset > 200
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const fetchPosts = async () => {
  loading.value = true;
  error.value = null;
  try {
    console.log('正在獲取文章，參數:', {
      category: props.selectedCategory,
      search: props.searchQuery,
      sort: props.sortBy
    });
    
    props.posts = await getPosts({
      category: props.selectedCategory,
      search: props.searchQuery,
      sort: props.sortBy
    });
    
    console.log('獲取文章成功:', props.posts);
  } catch (err) {
    console.error('獲取文章失敗:', err);
    error.value = err.response?.data?.message || '獲取文章失敗';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPosts)

watch([
  () => props.selectedCategory,
  () => props.searchQuery,
  () => props.sortBy
], fetchPosts)

const handleDelete = async (id) => {
  if (!confirm('確定要刪除這篇文章嗎？')) return
  
  try {
    await deletePost(id)
    emit('refresh')
  } catch (error) {
    console.error('刪除文章失敗:', error)
  }
}

const handleEdit = (post) => {
  emit('edit', post)
}

const getCategoryClass = (category) => {
  const classes = {
    '技術': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    '生活': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    '美食': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    '攝影': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    '居家': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    '影評': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    '寵物': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    '健康': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
  }
  return classes[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
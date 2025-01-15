<template>
  <div class="space-y-6">
    <div class="grid gap-6">
      <BlogPost
        v-for="post in filteredPosts"
        :key="post.id"
        v-bind="post"
      />
    </div>
  </div>
</template>

<script setup>
import BlogPost from './BlogPost.vue'
import { ref, computed } from 'vue'

const props = defineProps({
  selectedCategory: {
    type: String,
    default: ''
  },
  searchQuery: {
    type: String,
    default: ''
  }
})

const posts = ref([
  {
    id: 1,
    title: '開始學習 Vue',
    content: 'Vue 是一個很棒的前端框架...',
    date: '2024-03-20',
    category: '技術'
  },
  {
    id: 2,
    title: '如何使用 Tailwind CSS',
    content: 'Tailwind CSS 是一個實用優先的 CSS 框架...',
    date: '2024-03-21',
    category: '技術'
  },
  {
    id: 3,
    title: '我的旅行日記',
    content: '今天去了一個很美的地方...',
    date: '2024-03-22',
    category: '生活'
  },
  {
    id: 4,
    title: '美食推薦',
    content: '發現了一家很棒的餐廳...',
    date: '2024-03-23',
    category: '美食'
  }
])

const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(props.searchQuery.toLowerCase())
    const matchesCategory = !props.selectedCategory || post.category === props.selectedCategory
    return matchesSearch && matchesCategory
  })
})
</script> 
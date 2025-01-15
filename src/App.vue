<template>
  <div :class="{'dark': isDark}" class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <header class="bg-white dark:bg-gray-800 shadow-md">
      <div class="max-w-7xl mx-auto py-6 px-4">
        <div class="flex items-center justify-between gap-4">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white whitespace-nowrap">我的博客</h1>
          
          <div class="flex-1 max-w-xl">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章..."
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          
          <button 
            @click="toggleDark" 
            class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title="切換深色模式"
          >
            <span v-if="isDark" class="text-yellow-400">🌞</span>
            <span v-else class="text-gray-700">🌙</span>
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto flex gap-6 px-4 py-8">
      <aside class="w-64 flex-shrink-0">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">分類</h2>
          <nav class="space-y-2">
            <button
              @click="selectedCategory = ''"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                !selectedCategory 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              全部文章
            </button>
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              {{ category }}
            </button>
          </nav>
        </div>
      </aside>
      <main class="flex-1">
        <BlogList 
          :selectedCategory="selectedCategory"
          :searchQuery="searchQuery"
        />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import BlogList from './components/BlogList.vue'

const isDark = ref(false)
const selectedCategory = ref('')
const searchQuery = ref('')

const checkSystemDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const initDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode')
  
  if (savedMode !== null) {
    isDark.value = savedMode === 'true'
  } else {
    isDark.value = checkSystemDarkMode()
  }
  
  updateDarkMode()
}

const updateDarkMode = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('darkMode', isDark.value)
}

const toggleDark = () => {
  isDark.value = !isDark.value
}

const watchSystemDarkMode = () => {
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (localStorage.getItem('darkMode') === null) {
        isDark.value = e.matches
      }
    })
}

watch(isDark, () => {
  updateDarkMode()
})

onMounted(() => {
  initDarkMode()
  watchSystemDarkMode()
})

const categories = computed(() => ['技術', '生活', '美食'])
</script> 
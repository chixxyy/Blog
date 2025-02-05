<template>
  <div :class="{'dark': isDark}" class="flex flex-col min-h-screen bg-gray-100 transition-colors duration-300 dark:bg-gray-900">
    <header class="bg-white shadow-md dark:bg-gray-800">
      <div class="px-4 py-6 mx-auto max-w-7xl">
        <div class="flex gap-4 justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-800 whitespace-nowrap dark:text-white">ChiBlog</h1>
          
          <div class="flex-1 max-w-xl">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="搜尋文章..."
              class="px-4 py-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          
          <button 
            @click="toggleDark" 
            class="p-2 bg-gray-200 rounded-lg transition-colors dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="切換深色模式"
          >
            <span v-if="isDark" class="text-yellow-400">🌞</span>
            <span v-else class="text-gray-700">🌙</span>
          </button>
        </div>
      </div>
    </header>

    <div class="flex-grow">
      <div class="flex gap-6 px-4 py-8 mx-auto max-w-7xl">
        <aside class="sticky top-4 flex-shrink-0 self-start space-y-6 w-64">
          <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">文章分類</h2>
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

          <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">贊助商</h2>
            <div class="space-y-4">
              <a href="https://github.com/chixxyy/VueMyBlog" class="block group">
                <img 
                  :src="ads.leftSide.image" 
                  alt="廣告" 
                  class="object-cover mb-2 w-full h-40 rounded-lg" 
                />
                <p class="text-sm text-gray-500 dark:text-gray-400">廣告</p>
              </a>
            </div>
          </div>

          <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">熱門標籤</h2>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">Vue3</span>
              <span class="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">旅遊</span>
              <span class="px-3 py-1 text-sm text-yellow-800 bg-yellow-100 rounded-full dark:bg-yellow-900 dark:text-yellow-200">美食</span>
              <span class="px-3 py-1 text-sm text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-200">攝影</span>
              <span class="px-3 py-1 text-sm text-pink-800 bg-pink-100 rounded-full dark:bg-pink-900 dark:text-pink-200">裝修</span>
              <span class="px-3 py-1 text-sm text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-200">電影</span>
            </div>
          </div>

          <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">最新文章</h2>
            <div class="space-y-4">
              <a href="#" v-for="i in 3" :key="i" class="block group">
                <h3 class="text-gray-800 transition-colors dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400">
                  Vue3 新特性探索
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">2024-03-15</p>
              </a>
            </div>
          </div>
        </aside>

        <main class="flex-1 min-w-0">
          <BlogList 
            :selectedCategory="selectedCategory"
            :searchQuery="searchQuery"
            :sortBy="sortBy"
          />
        </main>

        <aside class="sticky top-4 flex-shrink-0 self-start space-y-6 w-64">
          <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">排序方式</h2>
            <select 
              v-model="sortBy"
              class="px-3 py-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="newest">最新發布</option>
              <option value="oldest">最早發布</option>
              <option value="title">標題排序</option>
            </select>
          </div>

          <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">最近閱讀</h2>
            <div class="space-y-3">
              <a v-for="i in 3" :key="i" href="#" class="block group">
                <h3 class="text-gray-800 transition-colors dark:text-white group-hover:text-blue-500">
                  Vue3 組件設計模式
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">5分鐘前閱讀</p>
              </a>
            </div>
          </div>

          <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">推薦文章</h2>
            <div class="space-y-3">
              <div v-for="i in 3" :key="i" class="flex gap-3 items-center">
                <span class="flex justify-center items-center w-8 h-8 text-white bg-blue-500 rounded-full">
                  {{ i }}
                </span>
                <a href="#" class="text-gray-800 transition-colors dark:text-white hover:text-blue-500">
                  TypeScript 最佳實踐指南
                </a>
              </div>
            </div>
          </div>

          <div class="p-6 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">網站統計</h2>
            <div class="space-y-4">
              <div>
                <p class="text-2xl font-bold text-blue-500">{{ stats.totalPosts }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">文章總數</p>
              </div>
              
              <div>
                <p class="text-2xl font-bold text-green-500">{{ categories.length }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">分類數量</p>
              </div>
              
              <div>
                <p class="text-2xl font-bold text-purple-500">{{ stats.totalViews }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">總瀏覽次數</p>
              </div>
              
              <div>
                <p class="text-2xl font-bold text-orange-500">{{ stats.totalReaders }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">讀者數量</p>
              </div>
            </div>
          </div>

          <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">精選推廣</h2>
            <div class="space-y-4">
              <a href="https://github.com/chixxyy/VueMyBlog" class="block group">
                <div class="relative">
                  <img 
                    :src="ads.rightSide.image" 
                    alt="廣告" 
                    class="object-cover w-full h-40 rounded-lg" 
                  />
                  <span class="absolute top-2 right-2 px-2 py-1 text-xs text-white bg-gray-900 bg-opacity-50 rounded">廣告</span>
                </div>
                <h3 class="mt-2 text-gray-800 dark:text-white group-hover:text-blue-500">課程推薦</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">立即報名享優惠</p>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <footer class="mt-auto bg-white shadow-md dark:bg-gray-800">
      <div class="px-4 py-8 mx-auto max-w-7xl">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">關於我們</h3>
            <p class="text-gray-600 dark:text-gray-300">
              一月份開始的一個小起點
            </p>
          </div>

          <div>
            <h3 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">快速連結</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                  最新文章
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                  熱門文章
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">聯絡資訊</h3>
            <ul class="space-y-2">
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                danielchixxyy@gmail.com
              </li>
              <li class="flex items-center text-gray-600 dark:text-gray-300">
                <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                台北市大同區
              </li>
            </ul>
          </div>
        </div>

        <div class="pt-8 mt-8 text-center text-gray-600 border-t border-gray-200 dark:border-gray-700 dark:text-gray-300">
          <p>© 2025 ChiBlog</p>
        </div>
      </div>
    </footer>

    <div 
      v-show="showFloatingAd" 
      class="fixed right-4 top-1/3 z-50 transition-all duration-300"
      :class="{
        'translate-x-0 opacity-100': showFloatingAd, 
        'translate-x-full opacity-0': !showFloatingAd
      }"
    >
      <div class="relative p-4 bg-white rounded-lg border-2 border-blue-500 shadow-lg dark:bg-gray-800">
        <button 
          @click="closeFloatingAd" 
          class="absolute -top-2 -right-2 p-1 text-gray-500 bg-white rounded-full shadow-md hover:text-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <span class="sr-only">關閉廣告</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div class="max-w-xs">
          <img 
            :src="floatingAd.image" 
            alt="廣告" 
            class="object-cover mb-2 w-full h-32 rounded-lg"
            @click="handleAdClick('floating', floatingAd.id)"
          />
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ floatingAd.title }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ floatingAd.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onUnmounted } from 'vue'
import BlogList from './components/BlogList.vue'

const isDark = ref(false)
const selectedCategory = ref('')
const searchQuery = ref('')
const sortBy = ref('newest')

const stats = ref({
  totalPosts: 15,
  totalViews: '1.2K',
  totalReaders: 328
})

const checkSystemDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const initDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode')
  isDark.value = savedMode !== null ? savedMode === 'true' : checkSystemDarkMode()
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

const categories = computed(() => [
  '技術',
  '生活',
  '美食',
  '攝影',
  '居家',
  '影評',
  '寵物',
  '健康'
])

const ads = ref({
  leftSide: {
    image: 'https://picsum.photos/200',
    link: 'https://github.com/chixxyy/VueMyBlog',
  },
  rightSide: {
    image: 'https://picsum.photos/200',
    link: 'https://github.com/chixxyy/VueMyBlog',
  }
})

const trackAdClick = (position, adId) => {
  console.log(`Ad clicked: ${position} - ${adId}`)
}

const trackAdImpression = (position, adId) => {
  console.log(`Ad impressed: ${position} - ${adId}`)
}

const threshold = 0;
const showFloatingAd = ref(false)
const hasClosedAd = ref(false)

const floatingAd = ref({
  id: 'floating-1',
  image: 'https://picsum.photos/200',
  title: '限時優惠活動',
  description: '新用戶專屬優惠，立即查看',
  link: 'https://github.com/chixxyy/VueMyBlog'
})

const handleScroll = () => {
  if (hasClosedAd.value) return
  
  const scrollPosition = window.scrollY
  
  showFloatingAd.value = scrollPosition > threshold
}

const closeFloatingAd = () => {
  showFloatingAd.value = false
  hasClosedAd.value = true
  localStorage.setItem('adClosed', 'true')
}

const handleAdClick = (position, adId) => {
  trackAdClick(position, adId)
}

onMounted(() => {
  hasClosedAd.value = localStorage.getItem('adClosed') === 'true'
  
  window.addEventListener('scroll', handleScroll)
  
  if (!hasClosedAd.value) {
    trackAdImpression('floating', floatingAd.value.id)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script> 
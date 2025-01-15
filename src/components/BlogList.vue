<template>
  <div class="space-y-6">
    <article 
      v-for="post in sortedAndFilteredPosts" 
      :key="post.id"
      class="overflow-hidden bg-white rounded-lg shadow-md transition-all duration-300 dark:bg-gray-800 hover:shadow-lg"
    >
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-gray-800 transition-colors dark:text-white hover:text-blue-500 dark:hover:text-blue-400">
            {{ post.title }}
          </h2>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
        </div>
        
        <p class="mb-4 text-gray-600 dark:text-gray-300">{{ post.content }}</p>
        
        <div class="flex justify-between items-center">
          <span 
            class="px-3 py-1 text-sm font-medium rounded-full"
            :class="getCategoryClass(post.category)"
          >
            {{ post.category }}
          </span>
        </div>
      </div>
    </article>

    <div 
      v-if="sortedAndFilteredPosts.length === 0" 
      class="py-10 text-center text-gray-500 dark:text-gray-400"
    >
      沒有找到相關文章
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  selectedCategory: {
    type: String,
    default: ''
  },
  searchQuery: {
    type: String,
    default: ''
  },
  sortBy: {
    type: String,
    default: 'newest'
  }
})

const posts = ref([
  {
    id: "post1",
    title: "Vue3 組合式 API 指南",
    content: "組合式 API 是 Vue3 中最重要的特性之一，它提供了更好的代碼組織方式和可重用性...",
    date: "2024-03-15",
    category: "技術"
  },
  {
    id: "post2",
    title: "Pinia 狀態管理實戰",
    content: "Pinia 作為 Vue 的官方狀態管理方案，相比 Vuex 具有更好的 TypeScript 支持和更簡潔的 API...",
    date: "2024-03-14",
    category: "技術"
  },
  {
    id: "post3",
    title: "Vue Router 4.0 新特性",
    content: "Vue Router 4.0 帶來了許多新特性，包括更好的 TypeScript 支持和組合式 API 集成...",
    date: "2024-03-13",
    category: "技術"
  },
  {
    id: "post4",
    title: "台北美食推薦",
    content: "今天要跟大家分享台北幾家必吃的美食餐廳，包括米其林星級餐廳和在地小吃...",
    date: "2024-03-12",
    category: "美食"
  },
  {
    id: "post5",
    title: "週末登山心得",
    content: "這週末和朋友一起去陽明山健行，分享一下路線規劃和注意事項...",
    date: "2024-03-11",
    category: "生活"
  },
  {
    id: "post6",
    title: "TailwindCSS 使用技巧",
    content: "分享一些使用 TailwindCSS 開發時的實用技巧，包括如何組織類名、如何自定義配置、如何優化生產環境的構建等。TailwindCSS 作為一個實用優先的 CSS 框架，能夠幫助我們快速構建現代化的用戶界面...",
    date: "2024-03-10",
    category: "技術"
  },
  {
    id: "post7",
    title: "深入理解 Vue.js 響應式系統",
    content: "Vue.js 的響應式系統是其最核心的特性之一，本文將深入探討其工作原理和實現機制。包括響應式數據的追踪方式、依賴收集過程、以及如何處理複雜的數據結構變化。同時也會介紹 Vue3 中新的響應式系統實現方式，以及與 Vue2 的區別...",
    date: "2024-03-09",
    category: "技術"
  },
  {
    id: "post8",
    title: "新竹一日遊行程推薦",
    content: "週末帶著家人去新竹玩，分享這次的行程規劃。上午先到北埔老街品嚐客家美食，接著去內灣老街體驗懷舊風情，下午到青草湖踏青，最後在新竹城隍廟夜市享受在地小吃。包括景點介紹、交通建議、美食推薦和實用小提醒...",
    date: "2024-03-08",
    category: "生活"
  },
  {
    id: "post9",
    title: "夜市美食大搜查",
    content: "整理了台灣各大夜市必吃美食，從傳統小吃到創新料理，讓你一次吃個過癮。包括士林夜市的大餅包小餅、饒河夜市的藥燉排骨、華西街夜市的蛇肉湯，以及各式特色甜點。每個攤位都附上詳細位置和營業時間，還有排隊攻略...",
    date: "2024-03-07",
    category: "美食"
  },
  {
    id: "post10",
    title: "前端性能優化指南",
    content: "分享一系列前端性能優化的實用技巧，從打包優化到運行時性能，一應俱全。包括代碼分割、懶加載、圖片優化、緩存策略、服務端渲染考量等多個方面。同時也會介紹一些實用的性能監測工具和性能指標的含義，幫助大家打造更快速的網站...",
    date: "2024-03-06",
    category: "技術"
  },
  {
    id: "post11",
    title: "攝影入門指南",
    content: "分享攝影的基礎知識，包括光圈、快門、ISO 的關係，以及構圖技巧。從器材選擇到後期處理，幫助新手快速上手數位攝影...",
    date: "2024-03-05",
    category: "攝影"
  },
  {
    id: "post12",
    title: "居家裝修經驗分享",
    content: "最近完成了新家裝修，分享從設計規劃到施工完工的全過程。包括預算控制、材料選擇、工程進度管理，以及一些常見陷阱的避免方法...",
    date: "2024-03-04",
    category: "居家"
  },
  {
    id: "post13",
    title: "電影評論：奧本海默",
    content: "諾蘭導演的新作《奧本海默》不僅僅是一部傳記片，更是對人性、科學倫理的深度探討。本文將從劇情、攝影、配樂等多個角度進行解析...",
    date: "2024-03-03",
    category: "影評"
  },
  {
    id: "post14",
    title: "寵物飼養指南",
    content: "第一次養寵物需要注意什麼？從日常照顧、飲食習慣到醫療保健，全面介紹貓狗飼養的注意事項。包括選擇寵物、準備用品、訓練技巧等實用建議...",
    date: "2024-03-02",
    category: "寵物"
  },
  {
    id: "post15",
    title: "健身初學者指南",
    content: "為想開始健身的朋友準備的完整指南，包括基礎器材介紹、常見動作要領、營養補充建議等。從制定訓練計劃到飲食控制，幫助你建立健康的生活方式...",
    date: "2024-03-01",
    category: "健康"
  }
])

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

const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesSearch = !props.searchQuery || 
      post.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(props.searchQuery.toLowerCase())
    const matchesCategory = !props.selectedCategory || post.category === props.selectedCategory
    return matchesSearch && matchesCategory
  })
})

const sortedAndFilteredPosts = computed(() => {
  let result = filteredPosts.value.slice()
  
  switch (props.sortBy) {
    case 'newest':
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
    case 'oldest':
      result.sort((a, b) => new Date(a.date) - new Date(b.date))
      break
    case 'title':
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
  }
  
  return result
})

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
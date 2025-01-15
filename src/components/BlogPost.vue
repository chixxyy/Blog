<template>
  <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="p-6">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ title }}</h2>
        <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
          {{ category }}
        </span>
      </div>
      
      <div class="text-gray-600 dark:text-gray-300 mb-4">
        {{ content }}
      </div>
      
      <div class="flex justify-between items-center text-sm">
        <span class="text-gray-500 dark:text-gray-400">{{ date }}</span>
        <button class="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
          閱讀更多
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
  date: String,
  category: String
})
</script> 
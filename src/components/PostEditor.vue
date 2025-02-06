<template>
  <div class="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <h2 class="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
      {{ isEditing ? '編輯文章' : '發布新文章' }}
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block mb-2 text-gray-700 dark:text-gray-300">標題</label>
        <input
          v-model="form.title"
          type="text"
          required
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <div>
        <label class="block mb-2 text-gray-700 dark:text-gray-300">分類</label>
        <select
          v-model="form.category"
          required
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">請選擇分類</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      
      <div>
        <label class="block mb-2 text-gray-700 dark:text-gray-300">內容</label>
        <textarea
          v-model="form.content"
          required
          rows="6"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
      </div>
      
      <div class="flex justify-end gap-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          取消
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          :disabled="loading"
        >
          {{ loading ? '處理中...' : (isEditing ? '更新' : '發布') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { createPost, updatePost } from '../services/api';

const props = defineProps({
  post: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['cancel', 'save']);

const loading = ref(false);
const form = ref({
  title: props.post?.title || '',
  content: props.post?.content || '',
  category: props.post?.category || ''
});

const isEditing = computed(() => !!props.post);

const categories = [
  '技術',
  '生活',
  '美食',
  '攝影',
  '居家',
  '影評',
  '寵物',
  '健康'
];

const handleSubmit = async () => {
  loading.value = true;
  try {
    const data = isEditing.value
      ? await updatePost(props.post._id, form.value)
      : await createPost(form.value);
    emit('save', data);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script> 
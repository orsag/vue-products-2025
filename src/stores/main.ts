import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/types'

export const useMainStore = defineStore('main', () => {
  const operation = ref<'update' | 'create' | ''>('')
  const categories = ref<Category[]>([])
  const selectedCategory = ref<Category | null>(null)

  const setSelectedCategory = (newVal: Category) => (selectedCategory.value = newVal)

  return { operation, categories, selectedCategory, setSelectedCategory }
})

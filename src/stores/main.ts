import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AttributeDefinition, Category, Product } from '@/types'
import type { DataTableProps } from 'primevue'

export const useMainStore = defineStore('main', () => {
  const operation = ref<'update' | 'create' | ''>('')
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const selectedCategory = ref<Category | null>(null)
  const filters = ref<DataTableProps['filters']>({})

  const setSelectedCategory = (newVal: Category) => (selectedCategory.value = newVal)

  const updateFilters = () => {
    if (selectedCategory.value) {
      const dynamicFilters = selectedCategory.value?.schema?.reduce(
        (acc: Record<string, any>, item: AttributeDefinition) => {
          acc[`attributes.${item.key}`] = { value: null, matchMode: 'contains' }
          return acc
        },
        {},
      )
      delete dynamicFilters['attributes.test']
      const staticFilters = {
        name: { value: null, matchMode: 'contains' },
        stock: { value: null, matchMode: 'contains' },
        price: { value: null, matchMode: 'contains' },
      }
      filters.value = { ...staticFilters, ...dynamicFilters }
    }
  }

  return {
    operation,
    categories,
    selectedCategory,
    products,
    filters,
    setSelectedCategory,
    updateFilters,
  }
})

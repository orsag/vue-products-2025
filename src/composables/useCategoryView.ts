import { BaseError } from '@/BaseError'
import { useMainStore } from '@/stores/main'
import type { AttributeDefinition, Category } from '@/types'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const EMPTY_CAT = {
  id: 'id',
  name: '',
  icon: '',
  color: '',
  schema: [],
  createdAt: '',
}

export function useCategoryView() {
  const mainStore = useMainStore()
  const { operation, categories, selectedCategory } = storeToRefs(mainStore)
  const localCategory = ref<Category>(selectedCategory.value ?? EMPTY_CAT)

  const updateCategory = async (updatedCategory: Category) => {
    const url = `/api/categories/${updatedCategory.id}`

    try {
      const response = await fetch(url, { method: 'PATCH' })
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      const data = await response.json()
      const updatedCategories = categories.value.map((c: Category) => {
        if (c.id === updatedCategory.id) {
          return data
        } else {
          return c
        }
      })
      categories.value = updatedCategories
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
    }
  }

  const createCategory = () => {}

  const handleDeleteAttribute = (id: string) => {
    localCategory.value.schema = localCategory.value.schema.filter(
      (ad: AttributeDefinition) => ad.key !== id,
    )
    // localCategory.value = {
    //   ...localCategory.value,
    //   schema: localCategory.value.schema.filter((ad: AttributeDefinition) => ad.key !== id),
    // }
    console.log(localCategory.value.schema)
  }

  return {
    localCategory,
    operation,
    selectedCategory,
    updateCategory,
    createCategory,
    handleDeleteAttribute,
  }
}

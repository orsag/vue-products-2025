import { BaseError } from '@/BaseError'
import { useMainStore } from '@/stores/main'
import type { AttributeDefinition, Category } from '@/types'
import type { FormData } from '@/views/CategoryView.vue'
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

  const updateCategory = async (formData: FormData) => {
    localCategory.value.name = formData.name
    localCategory.value.icon = formData.icon
    localCategory.value.color = formData.color
    console.log(localCategory.value)
    // console.log(formData)
    const url = `/api/categories/${localCategory.value.id}`

    try {
      const response = await fetch(url, { method: 'PATCH' })
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      const data = await response.json()
      const updatedCategories = categories.value.map((c: Category) => {
        if (c.id === localCategory.value.id) {
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

  const createCategory = async (formData: FormData) => {
    localCategory.value.name = formData.name
    localCategory.value.icon = formData.icon
    localCategory.value.color = formData.color
    localCategory.value.createdAt = new Date().toDateString()
    console.log(localCategory.value)

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(localCategory.value),
      })
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      const data = await response.json()
      console.log(data)
      //   categories.value = updatedCategories
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
    }
  }

  const handleDeleteAttribute = (id: string) => {
    localCategory.value.schema = localCategory.value.schema.filter(
      (ad: AttributeDefinition) => ad.key !== id,
    )
    console.log(localCategory.value.schema)
  }

  const createdAttribute = (newAttribute: AttributeDefinition) => {
    localCategory.value.schema?.push(newAttribute)
    console.log(localCategory.value)
  }

  return {
    selectedCategory,
    localCategory,
    operation,
    updateCategory,
    createCategory,
    handleDeleteAttribute,
    createdAttribute,
  }
}

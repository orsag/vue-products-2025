import { BaseError } from '@/BaseError'
import { useMainStore } from '@/stores/main'
import type { AttributeDefinition, Category } from '@/types'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface FormData {
  id: string
  name: string
  icon: string
  color: string
}

const EMPTY_CAT = {
  id: '',
  name: '',
  icon: '',
  color: '',
  schema: [],
  createdAt: '',
}

export function useCategoryView() {
  const router = useRouter()
  const mainStore = useMainStore()
  const { operation, categories, selectedCategory } = storeToRefs(mainStore)
  const localCategory = ref<Category>(selectedCategory.value ?? { ...EMPTY_CAT })

  const updateCategory = async (formData: FormData) => {
    localCategory.value.name = formData.name
    localCategory.value.icon = formData.icon
    localCategory.value.color = formData.color
    console.log(localCategory.value)
    // console.log(formData)
    const url = `/api/categories/${localCategory.value.id}`

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(localCategory.value),
      })
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      const data = await response.json()
      const updatedCategories = categories.value.map((cat: Category) => {
        if (cat.id === localCategory.value.id) {
          return data
        } else {
          return cat
        }
      })
      categories.value = updatedCategories
      router.push({ name: 'main' })
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
    }
  }

  const createCategory = async (formData: FormData) => {
    const { id, name, icon, color } = formData
    localCategory.value = { ...EMPTY_CAT, id, name, icon, color }
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
      const newCategory = await response.json()
      categories.value = [categories.value, { ...newCategory }]
      router.push({ name: 'main' })
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
    }
  }

  const handleDeleteAttribute = (id: string) => {
    localCategory.value.schema = localCategory.value.schema.filter(
      (item: AttributeDefinition) => item.key !== id,
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

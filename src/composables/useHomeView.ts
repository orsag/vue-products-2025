import { BaseError } from '@/BaseError'
import { useMainStore } from '@/stores/main'
import type { Category, Product } from '@/types'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useHomeView() {
  const products = ref<Product[]>([])

  const mainStore = useMainStore()
  const router = useRouter()

  const { setSelectedCategory } = mainStore
  const { operation, categories, selectedCategory } = storeToRefs(mainStore)

  const getCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      const data = await response.json()
      categories.value = data
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
    }
  }

  const getProductsByCategory = async (categoryId: string) => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      const data = await response.json()
      const productsFiltered = data?.filter((p: Product) => p.categoryId === categoryId)
      products.value = productsFiltered
      const newSelection = categories.value.find((c: Category) => c.id === categoryId)
      if (newSelection) {
        setSelectedCategory(newSelection)
      }
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
    }
  }

  const deleteCategory = async (categoryId: string) => {
    const url = `/api/categories/${categoryId}`

    try {
      const response = await fetch(url, { method: 'DELETE' })
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      categories.value = categories.value.filter((c: Category) => c.id === categoryId)
      return categoryId
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
      return false
    }
  }

  const handleEditCategory = () => {
    operation.value = 'edit'
    router.push({ name: 'category' })
  }

  const handleCreateCategory = () => {
    operation.value = 'create'
    router.push({ name: 'category' })
  }

  return {
    products,
    categories,
    selectedCategory,
    getCategories,
    getProductsByCategory,
    deleteCategory,
    handleCreateCategory,
    handleEditCategory,
  }
}

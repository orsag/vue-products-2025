import { BaseError } from '@/BaseError'
import { useMainStore } from '@/stores/main'
import type { Category, Product } from '@/types'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export function useHomeView() {
  const mainStore = useMainStore()
  const router = useRouter()
  const { setSelectedCategory } = mainStore
  const { operation, categories, products, selectedCategory } = storeToRefs(mainStore)

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
      categories.value = categories.value.filter((c: Category) => c.id !== categoryId)
      products.value = []
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
    }
  }

  const deleteProduct = async (data: Product) => {
    if (data?.id && data.id !== '') {
      const url = `/api/products/${data.id}`
      try {
        const response = await fetch(url, { method: 'DELETE' })
        if (!response.ok) {
          throw new BaseError('HTTP error!', { cause: String(response.status) })
        }
        products.value = products.value.filter((p: Product) => p.id !== data.id)
      } catch (err) {
        const error = err as BaseError
        console.log(error.message)
      }
    }
  }

  const editProduct = async (data: Product) => {
    console.log('to be developed')
  }

  const handleEditCategory = () => {
    operation.value = 'update'
    router.push({ name: 'category' })
  }

  const handleCreateCategory = () => {
    operation.value = 'create'
    router.push({ name: 'category' })
  }

  const handleAddProduct = () => {
    router.push({ name: 'product' })
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
    handleAddProduct,
    deleteProduct,
    editProduct,
  }
}

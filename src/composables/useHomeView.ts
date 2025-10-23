import { BaseError } from '@/BaseError'
import type { Category, Product } from '@/types'
import { ref } from 'vue'

export function useHomeView() {
  const categories = ref<Category[]>([])
  const products = ref<Product[]>([])
  const selectedCategory = ref<Category | null>(null)

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
      selectedCategory.value = categories.value.find((c: Category) => c.id === categoryId) || null
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
    }
  }

  return { products, categories, selectedCategory, getCategories, getProductsByCategory }
}

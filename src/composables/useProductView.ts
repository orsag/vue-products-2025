import { BaseError } from '@/BaseError'
import { useMainStore } from '@/stores/main'
import type { Product } from '@/types'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

export interface FormData {
  name: string
  price: number
  stock: number
  attributes: Record<string, any>
}

export function useProductView() {
  const router = useRouter()
  const localProduct = ref<Product | null>(null)

  const mainStore = useMainStore()
  const { updateFilters } = mainStore
  const { selectedCategory } = storeToRefs(mainStore)

  const createProduct = async (formData: FormData) => {
    const createdAt = new Date().toDateString()
    localProduct.value = {
      id: uuidv4(),
      categoryId: selectedCategory.value?.id ?? '',
      name: formData.name,
      price: formData.price,
      stock: formData.stock,
      createdAt: createdAt,
      updatedAt: createdAt,
      attributes: { ...formData.attributes },
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(localProduct.value),
      })
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      updateFilters()
      router.push({ name: 'main' })
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
    }
  }

  const cancelCreation = () => {
    localProduct.value = null
    router.push({ name: 'main' })
  }

  const TypeMap = new Map<string, number | boolean | string>([
    ['number', 0],
    ['boolean', false],
    ['text', ''],
    ['date', ''],
    ['select', ''],
  ])

  return { TypeMap, selectedCategory, createProduct, cancelCreation }
}

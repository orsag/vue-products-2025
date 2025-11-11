import { BaseError } from '@/BaseError'
import { BASIC, EMPTY, PAYMENT, DETAILS, SINGLE_ITEM } from '@/router/routes'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

export function useFakturaView() {
  const mainStore = useMainStore()
  const { invoices } = storeToRefs(mainStore)

  const generateContact = () => ({ ...EMPTY })

  const generateBasic = () => ({ ...BASIC })

  const generatePayment = () => ({ ...PAYMENT })

  const generateDetails = () => ({ ...DETAILS })

  const generateEmptyItem = () => ({ ...SINGLE_ITEM })

  const createFaktura = async (formData: any) => {
    console.log(formData.items)

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        body: JSON.stringify(formData.value),
      })
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      return true
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
      return false
    }
  }

  const getFirstInvoice = async () => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'GET',
      })
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      const data = await response.json()
      if (data && data.length && data[1]) {
        invoices.value.push(data[1])
      }
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
    }
  }

  return {
    generateContact,
    generateBasic,
    generatePayment,
    generateDetails,
    generateEmptyItem,
    createFaktura,
    getFirstInvoice,
  }
}

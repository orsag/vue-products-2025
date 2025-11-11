import { BaseError } from '@/BaseError'
import { BASIC, EMPTY, PAYMENT, DETAILS, SINGLE_ITEM } from '@/router/routes'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export function useFakturaView() {
  const mainStore = useMainStore()
  const { invoices } = storeToRefs(mainStore)

  const generateContact = () => ({ ...EMPTY })

  const generateBasic = () => ({ ...BASIC })

  const generatePayment = () => ({ ...PAYMENT })

  const generateDetails = () => ({ ...DETAILS })

  const generateEmptyItem = () => ({ ...SINGLE_ITEM })

  const createFaktura = async (formData: any) => {
    console.log(formData)
    formData.id = uuidv4()

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      invoices.value.push(formData)
      return true
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
      return false
    }
  }

  const editFaktura = async (formData: any) => {
    try {
      const response = await fetch('/api/invoices/' + formData.id, {
        method: 'PUT',
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new BaseError('HTTP error!', { cause: String(response.status) })
      }
      invoices.value = invoices.value.map((item) => {
        if (item.id === formData.id) {
          return formData
        } else {
          return item
        }
      })
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
      if (data && data.length && data[0]) {
        return data[0]
      }
      return null
    } catch (err) {
      const error = err as BaseError
      console.log(error.message)
      return null
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
    editFaktura,
  }
}

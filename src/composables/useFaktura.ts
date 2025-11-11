import { BASIC, EMPTY, PAYMENT, DETAILS, SINGLE_ITEM } from '@/router/routes'
import { useMainStore } from '@/stores/main'

export function useFakturaView() {
  const mainStore = useMainStore()
  const generateContact = () => ({ ...EMPTY })

  const generateBasic = () => ({ ...BASIC })

  const generatePayment = () => ({ ...PAYMENT })

  const generateDetails = () => ({ ...DETAILS })

  const generateEmptyItem = () => ({ ...SINGLE_ITEM })

  return {
    generateContact,
    generateBasic,
    generatePayment,
    generateDetails,
    generateEmptyItem,
  }
}

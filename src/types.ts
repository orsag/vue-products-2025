interface AttributeDefinition {
  key: string // např. "screenSize"
  label: string // např. "Velikost obrazovky"
  type: 'text' | 'number' | 'select' | 'date' | 'boolean'
  required: boolean
  options?: string[] // pro type: 'select'
  defaultValue?: any
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
  schema: AttributeDefinition[]
  createdAt: string
}

interface Product {
  id: string
  name: string
  categoryId: string
  price: number
  stock: number
  attributes: Record<string, any> // Dynamické atributy
  createdAt: string
  updatedAt: string
}

interface ColumnConfig {
  key: string
  label: string
  visible: boolean
  order: number
  width?: number
}

interface FilterConfig {
  attributeKey: string
  operator: 'eq' | 'contains' | 'gt' | 'lt' | 'between' | 'in'
  value: any
}

declare type Nullable<T = void> = T | null | undefined

// FAKTURY
interface ContactForm {
  company: string
  person: string
  street: string
  city: string
  ZIP: string
  country: string
  companyID: string // ico
  taxNumber: string // dic
  vatID: string // ic dph
  vatPayer: boolean
  details: string
  phone: string
  email: string
  web: string
  iban: string
  bank: string
}

interface BasicForm {
  invoiceNumber: string
  invoiceType: string
  reference: string
  service: string
  dateOfIssue: string
  dateOfDelivery: string
  dueDate: string
  orderNumber: string
}

interface PaymentForm {
  currency: string
  method: string
  roundingTotal: string
  alreadyPaid: string
  discount: string
}

interface PaymentDetails {
  language: string
  noteAboveItems: string
  noteBelowItems: string
  issuedBy: string
  internalNote: string
}

interface PaymentItem {
  description: string
  unit: string
  quantity: string
  pricePerUnit: string
}

export type {
  AttributeDefinition,
  Category,
  Product,
  ColumnConfig,
  FilterConfig,
  Nullable,
  ContactForm,
  BasicForm,
  PaymentDetails,
  PaymentForm,
  PaymentItem,
}

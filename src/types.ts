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

export type { AttributeDefinition, Category, Product, ColumnConfig, FilterConfig }

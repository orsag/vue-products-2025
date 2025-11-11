export enum ROUTENAMES {
  HOME = 'home',
  PRODUCT = 'product',
  CATEGORY = 'category',
  FAKTURA = 'faktura',
}

export const EMPTY = {
  company: '',
  person: '',
  street: '',
  city: '',
  ZIP: '',
  country: '',
  companyID: '', // ico
  taxNumber: '', // dic
  vatID: '', // ic dph
  vatPayer: false,
  details: '',
  phone: '',
  email: '',
  web: '',
  iban: '',
  bank: '',
}

export const BASIC = {
  invoiceNumber: '',
  invoiceType: 'invoice',
  reference: '',
  service: '',
  dateOfIssue: '',
  dateOfDelivery: '',
  dueDate: '',
  orderNumber: '',
}

export const PAYMENT = {
  currency: '',
  method: '',
  roundingTotal: '',
  alreadyPaid: '',
  discount: '',
}

export const DETAILS = {
  language: '',
  noteAboveItems: '',
  noteBelowItems: '',
  issuedBy: '',
  internalNote: '',
}

export const SINGLE_ITEM = {
  description: '',
  unit: '',
  quantity: '',
  pricePerUnit: '',
}

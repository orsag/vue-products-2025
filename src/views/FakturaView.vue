<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useFakturaView } from '@/composables/useFaktura'
import { Button, ToggleButton } from 'primevue'
import ContactForm from '@/components/ContactForm.vue'
import BasicForm from '@/components/BasicForm.vue'
import PaymentForm from '@/components/PaymentForm.vue'
import PaymentDetailsForm from '@/components/PaymentDetailsForm.vue'
import ItemsForm from '@/components/ItemsForm.vue'
import PdfTemplate from '@/components/PdfTemplate.vue'

const {
  generateContact,
  generateBasic,
  generatePayment,
  generateDetails,
  generateEmptyItem,
  createFaktura,
  getFirstInvoice,
} = useFakturaView()
const firstItem = generateEmptyItem()
const isContectsOpened = ref(true)
const showHTML = ref(false)
const showForm = ref(true)

const formData = reactive({
  supplier: generateContact(),
  customer: generateContact(),
  basic: generateBasic(),
  payment: generatePayment(),
  details: generateDetails(),
  notes: '',
  language: 'slovak',
  items: [firstItem],
})

const handleSubmitForm = async () => {
  // const success = await createFaktura(formData)
  if (true) {
    showHTML.value = true
  }
}

const printPDF = () => {}
</script>

<template>
  <div class="centering">
    <h1>Nova faktura</h1>
    <div class="submit">
      <ToggleButton v-model="showForm" onLabel="Show" offLabel="Hide" />
      <Button size="small" label="Load first" @click="getFirstInvoice"></Button>
    </div>

    <form @submit.prevent="handleSubmitForm" class="form-container" v-show="showForm">
      <div class="twoCols" v-show="isContectsOpened">
        <ContactForm v-model:formData="formData.supplier" label="Supplier" />
        <ContactForm v-model:formData="formData.customer" label="Customer" />
      </div>
      <BasicForm v-model:formData="formData.basic" />
      <PaymentForm v-model:formData="formData.payment" />
      <PaymentDetailsForm v-model:formData="formData.details" />
      <ItemsForm v-model:formData="formData.items" />
      <div class="submit">
        <Button type="submit" label="Save"></Button>
        <Button type="button" label="Print PDF" @click="printPDF"></Button>
      </div>
    </form>

    <PdfTemplate v-show="showHTML"></PdfTemplate>
    <div class="submit" v-show="showHTML">
      <ToggleButton v-model="showHTML" onLabel="Hide HTML" offLabel="Show" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
}
.twoCols {
  gap: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.submit {
  gap: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.w-full {
  width: 100%;
}
.centering {
  min-width: 500px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.attribute {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
.form-container {
  width: 100%;
  max-width: 1000px;
  margin-top: 2em;
  margin-bottom: 2em;
}

.field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5em;
}

.field > input {
  width: 250px;
}

.field label {
  margin-right: 1rem;
  font-weight: 600;
}
</style>

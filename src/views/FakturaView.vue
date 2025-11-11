<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useFakturaView } from '@/composables/useFaktura'
import { Button } from 'primevue'
import ContactForm from '@/components/ContactForm.vue'
import BasicForm from '@/components/BasicForm.vue'
import PaymentForm from '@/components/PaymentForm.vue'
import PaymentDetailsForm from '@/components/PaymentDetailsForm.vue'
import ItemsForm from '@/components/ItemsForm.vue'

const { generateContact, generateBasic, generatePayment, generateDetails, generateEmptyItem } =
  useFakturaView()
const firstItem = generateEmptyItem()
const isContectsOpened = ref(true)

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

// // Watch formData.supplier for changes
// watch(
//   () => formData,
//   (newValue) => {
//     console.log(formData)
//     //   handleContactFormUpdate('Supplier', newValue)
//   },
//   { deep: true },
// ) // Use deep: true because formData.supplier is an object
</script>

<template>
  <div class="centering">
    <h1>Nova faktura</h1>
    <form @submit.prevent="() => {}" class="form-container">
      <div class="twoCols" v-show="isContectsOpened">
        <ContactForm v-model:formData="formData.supplier" label="Supplier" />
        <ContactForm v-model:formData="formData.customer" label="Customer" />
      </div>
      <div>
        <Button
          :label="isContectsOpened ? 'Hide contacts' : 'Show contacts'"
          @click="isContectsOpened = !isContectsOpened"
        ></Button>
      </div>
      <BasicForm v-model:formData="formData.basic" />
      <PaymentForm v-model:formData="formData.payment" />
      <PaymentDetailsForm v-model:formData="formData.details" />
      <ItemsForm v-model:formData="formData.items" />
    </form>
  </div>
</template>

<style scoped>
.twoCols {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  margin-top: 1.5rem;
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

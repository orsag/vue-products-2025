<script setup lang="ts">
import { PAYMENT } from '@/router/routes'
import type { PaymentForm } from '@/types'
import { Card, InputText, DatePicker } from 'primevue'

const formData = defineModel<PaymentForm>('formData', { default: { ...PAYMENT } })
</script>

<template>
  <Card>
    <template #title>Payment details</template>
    <template #content>
      <div class="verticalForm">
        <div class="field">
          <label for="currency">currency</label>
          <InputText size="small" id="currency" v-model="formData.currency" />
        </div>
        <div class="field">
          <label for="method">Payment method</label>
          <InputText size="small" id="method" v-model="formData.method" />
        </div>
        <div class="field">
          <label for="roundingTotal">Rounding total</label>
          <InputText size="small" id="roundingTotal" v-model="formData.roundingTotal" />
        </div>
        <div class="field">
          <label for="alreadyPaid">Already paid</label>
          <InputText size="small" id="alreadyPaid" v-model="formData.alreadyPaid" />
        </div>
        <div class="field">
          <label for="discount">Discount</label>
          <InputText size="small" id="discount" v-model="formData.discount" />
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="css" scoped>
.verticalForm {
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-right: 2em;
}
.field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5em;
}

.h3 {
  align-self: center;
  margin: 0 auto;
}

.field > input {
  width: 250px;
}

.field label {
  margin-right: 1rem;
  font-weight: 600;
}
</style>

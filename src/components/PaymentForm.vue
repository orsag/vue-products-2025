<script setup lang="ts">
import { PAYMENT } from '@/router/routes'
import type { PaymentForm } from '@/types'
import { Button, Card, InputText, DatePicker } from 'primevue'
import { ref } from 'vue'

const isExpanded = ref(true)
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
const formData = defineModel<PaymentForm>('formData', { default: { ...PAYMENT } })
</script>

<template>
  <Card :class="$style.customCard">
    <template #title>
      <div class="card-title">
        <span>Payment details</span>
        <Button
          size="small"
          icon="pi pi-arrow-up"
          :class="{ 'rotate-icon': !isExpanded }"
          @click="toggleExpand"
        />
      </div>
    </template>
    <template #content>
      <div :class="['content-wrapper', { expanded: isExpanded }]">
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
        </div>
        <div class="verticalForm">
          <div class="field">
            <label for="alreadyPaid">Already paid</label>
            <InputText size="small" id="alreadyPaid" v-model="formData.alreadyPaid" />
          </div>
          <div class="field">
            <label for="discount">Discount</label>
            <InputText size="small" id="discount" v-model="formData.discount" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="css" scoped>
.content-wrapper {
  display: flex;
  justify-content: space-between;
}
.verticalForm {
  width: 440px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
:deep(.p-button.rotate-icon .p-button-icon.pi) {
  transform: rotate(180deg);
}
:deep(.p-button .p-button-icon.pi) {
  transition: transform 0.3s ease;
}
</style>

<style module>
.customCard {
  border: 1px solid #ddd;
  box-shadow: 0 0 7px -1px #d6d6d6;
  top: -20px;
  border-radius: 5px 5px 5px 5px;
  margin-bottom: 2em;
  font-style: normal;
}
</style>

<script setup lang="ts">
import type { PaymentItem } from '@/types'
import { Card, InputText, DatePicker } from 'primevue'

const formData = defineModel<PaymentItem[]>('formData', { default: [] })
</script>

<template>
  <Card>
    <template #title>Invoice items</template>
    <template #content>
      <div v-for="item in formData" v-bind:key="item.description" class="verticalForm">
        <div class="field">
          <label for="description">Description</label>
          <InputText size="small" id="description" v-model="item.description" />
        </div>
        <div class="field">
          <label for="unit">Unit</label>
          <InputText size="small" id="unit" v-model="item.unit" />
        </div>
        <div class="field">
          <label for="quantity">Quantity</label>
          <InputText size="small" id="quantity" v-model="item.quantity" />
        </div>
        <div class="field">
          <label for="pricePerUnit">Price per unit</label>
          <InputText size="small" id="pricePerUnit" v-model="item.pricePerUnit" />
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

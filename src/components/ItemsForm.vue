<script setup lang="ts">
import type { PaymentItem } from '@/types'
import { Card, InputText, DatePicker } from 'primevue'

const formData = defineModel<PaymentItem[]>('formData', { default: [] })
</script>

<template>
  <Card :class="$style.customCard">
    <template #title>Invoice items</template>
    <template #content>
      <div v-for="item in formData" v-bind:key="item.description">
        <div class="wrapper">
          <div class="verticalForm">
            <div class="field">
              <label for="description">Description</label>
              <InputText size="small" id="description" v-model="item.description" />
            </div>
            <div class="field">
              <label for="unit">Unit</label>
              <InputText size="small" id="unit" v-model="item.unit" />
            </div>
          </div>
          <div class="verticalForm">
            <div class="field">
              <label for="quantity">Quantity</label>
              <InputText size="small" id="quantity" v-model="item.quantity" />
            </div>
            <div class="field">
              <label for="pricePerUnit">Price per unit</label>
              <InputText size="small" id="pricePerUnit" v-model="item.pricePerUnit" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="css" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
}
.verticalForm {
  width: 440px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.3em;
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
